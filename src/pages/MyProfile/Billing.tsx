import AppGridContainer from "../../components/AppGridContainer";
import IntlMessages from "../../helpers/IntlMessages";
import MyProfileWrapper from "./MyProfileWrapper";
import EditIcon from "@mui/icons-material/Edit";
import BillingHistory from "./BillingHistory";
import EditAddress from "./EditAddress";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Fonts } from "../../constants/AppEnums";
import { useDispatchResolve } from "@/utils/Hooks";
import { getUserInfoBilling } from "@/store/auth/action";
import { useSelector } from "react-redux";
import { getUserInfoBillingSelector } from "@/store/auth/selectors";
import { get } from "lodash";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Billing = () => {
  const [open, setOpen] = useState(false);
  const dispatchResolve = useDispatchResolve();
  const userInfoBilling = useSelector(getUserInfoBillingSelector);
  const billing = get(userInfoBilling, ["billing"]);

  useEffect(() => {
    dispatchResolve(getUserInfoBilling())
      .then()
      .catch(() => {});
  }, [dispatchResolve]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MyProfileWrapper>
        <AppGridContainer>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ fontSize: 16, fontWeight: Fonts.BOLD, mb: 3 }}>
              <IntlMessages id="billing.billingSettings" />
            </Box>
            <Box
              sx={{
                fontSize: 14,
                fontWeight: Fonts.BOLD,
                msTextCombineHorizontal: 4,
              }}
            >
              <IntlMessages id="billing.address" />
            </Box>
            <Box sx={{ fontSize: 14 }}>
              <IntlMessages id="billing.addressDes" />
            </Box>

            <AppGridContainer sx={{ mt: 2 }}>
              <Grid item xs={10} md={10}>
                {billing && (
                  <>
                    <Box sx={{ fontSize: 14 }}>
                      {`${billing.address} - ${billing.city}`}
                    </Box>
                    <Box sx={{ fontSize: 14 }}>{billing.state}</Box>
                    <Box sx={{ fontSize: 14 }}>{billing.country}</Box>
                  </>
                )}
              </Grid>

              <Grid item xs={2} md={2}>
                <Button
                  variant="outlined"
                  onClick={handleClickOpen}
                  sx={{ textTransform: "capitalize" }}
                >
                  <EditIcon className="mr-1" />
                  Edit Adress
                </Button>
              </Grid>
            </AppGridContainer>

            {billing?.name && (
              <>
                <Box sx={{ fontSize: 14, fontWeight: Fonts.BOLD, mt: 2 }}>
                  Company
                </Box>
                <Box sx={{ fontSize: 14 }}>{billing.name}</Box>
              </>
            )}

            <Box sx={{ fontSize: 14, fontWeight: Fonts.BOLD, mt: 2 }}>
              <IntlMessages id="billing.taxLocation" />
            </Box>
            <Box sx={{ fontSize: 14 }}>{billing ? billing.taxId : "N/A"}</Box>

            {billing?.zipCode && (
              <>
                <Box sx={{ fontSize: 14, fontWeight: Fonts.BOLD, mt: 2 }}>
                  ZIP Code
                </Box>
                <Box sx={{ fontSize: 14 }}>{billing.zipCode}</Box>
              </>
            )}
          </Box>
        </AppGridContainer>
      </MyProfileWrapper>

      <Box sx={{ mt: 2 }}>
        <MyProfileWrapper>
          <AppGridContainer>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ fontSize: 16, fontWeight: Fonts.BOLD, mb: 3 }}>
                <IntlMessages id="billing.billingHistory" />
              </Box>
              <BillingHistory />
            </Box>
          </AppGridContainer>
        </MyProfileWrapper>
      </Box>

      {/* Dialog Edit Address */}
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle id="alert-dialog-title">
            <IntlMessages id="billing.editAddress" />
            <Box sx={{ fontSize: 14 }}>
              <IntlMessages id="billing.addressDes" />
            </Box>
            <Box sx={{ fontSize: 14 }}>
              <IntlMessages id="billing.warningAddres" />
            </Box>
          </DialogTitle>
          <DialogActions sx={{ display: "flex", alignItems: "start" }}>
            <Button
              sx={{ height: "48px", borderRadius: "50%" }}
              onClick={handleClose}
              autoFocus
            >
              <AiOutlineCloseCircle className="w-6 text-2xl" />
            </Button>
          </DialogActions>
        </Box>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <EditAddress billing={billing} handleClose={handleClose} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Billing;
