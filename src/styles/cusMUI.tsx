import { Box, BoxProps, TableCell, TableContainer, TextField, Typography } from "@mui/material";
import { TableCellProps, TableContainerProps, TextFieldProps, TypographyProps } from "@mui/material";
import { rootShouldForwardProp } from "@mui/material/styles/styled";
import { styled } from "@mui/styles";
import appColors from "./appColor";

//MainContentBox
export const CusMainContent = styled(Box)<BoxProps>({
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
})


// Typography
export const CusTypography = styled(Typography)<TypographyProps>({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px',
    lineHeight: '24px',
    fontSize: 24,
    fontWeight: 500,
    fontFamily: 'Nunito',
    color: appColors.text.primary,
})
// TextField
export const CusTextField = styled(TextField)<TextFieldProps>({
    "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        border: 'none',
        "& fieldset": {
            border: "1px solid #acacac40",
            // background: 'linear-gradient(180deg, #3763a8 0%, #315a9a 50%, #3763a8 100%)',
            background: '#fff',
            boxShadow: '0 1px 2px 0 #333',
            transition: 'all 0.3s ease',
        },
        "&:hover fieldset": {
            border: "1px solid #acacac",
            transition: 'all 0.3s ease',
        },
        "&.Mui-focused": {
            "&:hover fieldset": {
                boxShadow: 'inset 2px 2px 4px 0 #0f172a ',
                transition: 'all 0.3s ease',
            },
            "& fieldset": {
                border: "2px solid transparent",
                boxShadow: 'inset 2px 2px 4px 0 #0f172a ',
            },
        },
    },
    "& .MuiFormLabel-root": {
        color: appColors.text.primary,
        fontWeight: 400,
        fontFamily: 'Nunito',
        "&.Mui-focused": {
            color: 'transparent'
        }
    },
    "& .MuiButtonBase-root": {
        backgroundColor: 'transparent ',
        zIndex: '1',
        transition: 'all 0.25s ease',
        "&:hover": {
            color: '#8100ff'
        },
        "&:hover .MuiSvgIcon-root": {
            color: '#8100ff'
        }
    },
    "& .MuiSvgIcon-root": {
        color: '#8100ff',
        "&:hover": {
            color: '#8100ff'
        }
    }
})
// Table Head
export const CusTableCellHead = styled(TableCell)<TableCellProps>({
    fontFamily: 'Nunito',
    fontSize: 18,
    // "&:not(:last-child)": {
    //     borderRight: `1px solid #1a3052`,
    // },
    borderBottom: `1px solid #e0e9ff`,
    "& span": {
        color: appColors.text.primary,
        fontWeight: 600,
    },
    "&:focus span": {
        color: '#fff'
    },
    "& .MuiTableSortLabel-root": {
        color: appColors.text.black,
        "& .MuiSvgIcon-root": {
            color: appColors.text.black,
        },
        "&:focus .MuiSvgIcon-root": {
            color: appColors.text.black,
        }
    },

})
export const CusTableCell = styled(TableCell)<TableCellProps>({
    fontFamily: 'Nunito',
    fontSize: 14,
    fontWeight: '500',
    color: '#3a3a3a ',
    "&:first-child": {
        color: appColors.text.primary
    },
    // "&:not(:last-child)": {
    //     borderRight: `1px solid #acacac`,
    // },
    borderBottom: `1px solid #e0e9ff`,
})
