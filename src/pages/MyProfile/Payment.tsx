import { Box, Button, Grid } from "@mui/material";
// import AppAnimate from "../../components/AppAnimate";
import { Fonts } from "../../constants/AppEnums";
import IntlMessages from "../../helpers/IntlMessages";
import AppGridContainer from "../../components/AppGridContainer";
import AppCard from "../../components/AppCard";
import EditAddress from "./EditAddress";
// ok

const Payment = () => {
  return (
    <Box>
      <Box
        sx={{
          component: "h2",
          color: "text.primary",
          fontWeight: Fonts.BOLD,
          mb: 6,
          fontSize: 16,
        }}
      >
        <IntlMessages id="payment.payment" />
      </Box>

      <AppGridContainer>
        <AppCard
          sx={{ width: "100%" }}
          title={
            <Box sx={{ fontSize: 16, fontWeight: Fonts.BOLD }}>
              <IntlMessages id="payment.manageBillingMethods" />
            </Box>
          }
        >
          <AppGridContainer>
            <Grid item xs={9} md={9}>
              <Box sx={{ fontSize: 14 }}>
                <IntlMessages id="payment.addUpdateRemove" />
              </Box>
            </Grid>
            <Grid item xs={3} md={3}>
              <Button variant="outlined">
                <IntlMessages id="payment.addANewBillingMethod" />
              </Button>
            </Grid>
          </AppGridContainer>

          <Box sx={{ fontSize: 14, mt: 4, fontWeight: Fonts.BOLD }}>
            <IntlMessages id="payment.primary" />
          </Box>

          <Box sx={{ fontSize: 14 }}>
            <IntlMessages id="payment.primaryDes" />
          </Box>
        </AppCard>
      </AppGridContainer>

      <AppGridContainer>
        <AppCard
          sx={{ width: "100%", mt: 8 }}
          title={
            <Box sx={{ fontSize: 16, fontWeight: Fonts.BOLD }}>
              <IntlMessages id="payment.addANewBillingMethod" />
            </Box>
          }
        >
          <Box sx={{ fontSize: 14, display: "flex" }}>
            <IntlMessages id="payment.paymentCard" />
            <IntlMessages id="payment.paymentCardDes" />
          </Box>
          <Box sx={{ fontSize: 14, mt: 4 }}>
            <EditAddress />
          </Box>
        </AppCard>
      </AppGridContainer>
    </Box>
  );
};

export default Payment;
