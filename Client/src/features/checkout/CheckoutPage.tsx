import { Paper, Grid2, Box, Step, StepLabel, Stepper, Button } from "@mui/material";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import Info from "./Info";
import { useState } from "react";
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import { FormProvider, useForm } from "react-hook-form";

const steps = ["Teslimat Bilgileri", "Ödeme", "Sipariş Özeti"];

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <PaymentForm />;
        case 2:
            return <Review />;
        default:
            throw new Error("Bilinmeyen bir step");
    }
}

function CheckoutPage() {

    const [activeStep, setActiveStep] = useState(0);
    const methods = useForm();

    function handleNext(data: FieldValues) {
        console.log(data);
        setActiveStep(activeStep + 1);
    }

    function handlePrevious() {
        setActiveStep(activeStep - 1);
    }

    return (
        <FormProvider {...methods}>
            <Paper>
                <Grid2 container spacing={5}>
                    <Grid2 size={4} sx={{ borderRight: "1px solid", borderColor: "divider", p: 3 }}>
                        <Info />
                    </Grid2>
                    <Grid2 size={8} sx={{ p: 3 }}>
                        <Box >
                            <Stepper activeStep={activeStep} sx={{ height: 40, mb: 4 }}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                        <Box>
                            {activeStep === steps.length ? (
                                <h2>Sipariş tamamlandi.</h2>
                            ) : (
                                <form onSubmit={methods.handleSubmit(handleNext)}>
                                    {getStepContent(activeStep)}
                                    <Box>
                                        <Box sx={
                                            [
                                                {
                                                    display: "flex",
                                                },
                                                activeStep !== 0
                                                    ? { justifyContent: "space-between" }
                                                    : { justifyContent: "flex-end" }
                                            ]
                                        }>
                                            {
                                                activeStep !== 0 &&
                                                <Button startIcon={<ChevronLeftRounded />} variant="contained"
                                                    onClick={handlePrevious}>Geri</Button>
                                            }

                                            <Button type="submit" startIcon={<ChevronRightRounded />} variant="contained">İleri</Button>
                                        </Box>
                                    </Box>
                                </form>
                            )}

                        </Box>
                    </Grid2>
                </Grid2>
            </Paper>
        </FormProvider>
    );

}

export default CheckoutPage