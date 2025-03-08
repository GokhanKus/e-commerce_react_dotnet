using API.Context;
using API.Dto;
using API.Entity;
using API.Extensions;
using Iyzipay;
using Iyzipay.Model;
using Iyzipay.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController(AppDbContext context, IConfiguration config) : ControllerBase
    {
        [HttpGet()]
        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
            return await context.Orders
                        .Include(i => i.OrderItems)
                        .OrderToDto()
                        .Where(i => i.CustomerId == User.Identity!.Name)
                        .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDto?>> GetOrder(int id)
        {
            return await context.Orders
                        .Include(i => i.OrderItems)
                        .OrderToDto()
                        .Where(i => i.CustomerId == User.Identity!.Name && i.Id == id)
                        .FirstOrDefaultAsync();
        }

        [HttpPost()]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto orderDto)
        {
            var cart = await context.Carts
            .Include(c => c.CartItems)
            .ThenInclude(ci => ci.Product)
            .FirstOrDefaultAsync(p => p.CustomerId == User.Identity!.Name);

            if (cart is null)
                return BadRequest(new ProblemDetails { Title = "cart is null" });

            var items = new List<Entity.OrderItem>();

            foreach (var item in cart.CartItems)
            {
                var product = await context.Products.FindAsync(item.ProductId);

                var orderItem = new Entity.OrderItem
                {
                    ProductId = product!.Id,
                    ProductName = product.Name!,
                    ProductImage = product.ImageUrl!,
                    Price = product.Price,
                    Quantity = item.Quantity
                };

                items.Add(orderItem);
                product.Stock -= item.Quantity;
            }

            var subTotal = items.Sum(i => i.Price * i.Quantity);
            var deliveryFee = 0;

            var order = new Order
            {
                OrderItems = items,
                CustomerId = User.Identity!.Name,
                FirstName = orderDto.FirstName,
                LastName = orderDto.LastName,
                Phone = orderDto.Phone,
                City = orderDto.City,
                AddresLine = orderDto.AddresLine,
                SubTotal = subTotal,
                DeliveryFee = deliveryFee,
            };

            //payment
            var paymentResult = await ProcessPayment(orderDto, cart);
            order.ConversationId = paymentResult.ConversationId;
            order.BasketId = paymentResult.BasketId;

            context.Orders.Add(order);
            context.Carts.Remove(cart);

            var result = await context.SaveChangesAsync() > 0;
            return result ?
             CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order.Id) :
             BadRequest(new ProblemDetails { Title = "Problem getting order" });
        }
        private async Task<Payment> ProcessPayment(CreateOrderDto orderDto, Cart cart)
        {
            Options options = new Options();
            options.ApiKey = config["PaymentAPI:APIKey"];
            options.SecretKey = config["PaymentAPI:SecretKey"];
            options.BaseUrl = "https://sandbox-api.iyzipay.com";

            CreatePaymentRequest request = new CreatePaymentRequest();
            request.Locale = Locale.TR.ToString();
            request.ConversationId = Guid.NewGuid().ToString();
            request.Price = cart.CalculateTotal().ToString();
            request.PaidPrice = cart.CalculateTotal().ToString();
            request.Currency = Currency.TRY.ToString();
            request.Installment = 1;
            request.BasketId = Guid.NewGuid().ToString();
            request.PaymentChannel = PaymentChannel.WEB.ToString();
            request.PaymentGroup = PaymentGroup.PRODUCT.ToString();

            PaymentCard paymentCard = new PaymentCard();
            paymentCard.CardHolderName = orderDto.CardName;
            paymentCard.CardNumber = orderDto.CardNumber;
            paymentCard.ExpireMonth = orderDto.CardExpireMonth;
            paymentCard.ExpireYear = orderDto.CardExpireYear;
            paymentCard.Cvc = orderDto.CardCvc;
            paymentCard.RegisterCard = 0;
            request.PaymentCard = paymentCard;

            Buyer buyer = new Buyer();
            buyer.Id = "BY789";
            buyer.Name = orderDto.FirstName;
            buyer.Surname = orderDto.LastName;
            buyer.GsmNumber = orderDto.Phone;
            buyer.Email = "email@email.com";
            buyer.IdentityNumber = "74300864791";
            buyer.LastLoginDate = "2015-10-05 12:43:35";
            buyer.RegistrationDate = "2013-04-21 15:12:09";
            buyer.RegistrationAddress = orderDto.AddresLine;
            buyer.Ip = "85.34.78.112";
            buyer.City = orderDto.City;
            buyer.Country = "Turkey";
            buyer.ZipCode = "99999";
            request.Buyer = buyer;

            Address shippingAddress = new Address();
            shippingAddress.ContactName = orderDto.FirstName + " " + orderDto.LastName;
            shippingAddress.City = orderDto.City;
            shippingAddress.Country = "Turkey";
            shippingAddress.Description = orderDto.AddresLine;
            shippingAddress.ZipCode = "99999";
            request.ShippingAddress = shippingAddress;
            request.BillingAddress = shippingAddress;

            List<BasketItem> basketItems = new List<BasketItem>();

            foreach (var item in cart.CartItems)
            {
                BasketItem basketItem = new BasketItem();
                basketItem.Id = item.Id.ToString();
                basketItem.Name = item.Product.Name;
                basketItem.Category1 = "Saat";
                basketItem.ItemType = BasketItemType.PHYSICAL.ToString();
                basketItem.Price = ((double)item.Product.Price * item.Quantity).ToString();
                basketItems.Add(basketItem);
            }
            request.BasketItems = basketItems;
            Payment payment = await Payment.Create(request, options);
            return payment;
        }
    }
}