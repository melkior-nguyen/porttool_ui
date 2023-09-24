import React, { isValidElement, ReactNode } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Link,
} from "@mui/material";
import { Fonts } from "../../constants/AppEnums";

type AppCardProps = {
  sxStyle?: any;
  title?: string | ReactNode;
  titleStyle?: any;
  contentStyle?: any;
  headerStyle?: any;
  action?: ReactNode | string;
  actionStyle?: any;
  footer?: any;
  footerPosition?: string;
  footerStyle?: any;
  children: ReactNode;
  [x: string]: any;
};

const AppCard: React.FC<AppCardProps> = ({
  sxStyle,
  title = "",
  titleStyle,
  headerStyle,
  contentStyle,
  action,
  actionStyle,
  footer,
  footerPosition = "left",
  footerStyle,
  children,
  ...rest
}) => {
  return (
    <Card
      sx={{ display: "flex", ...sxStyle }}
      {...rest}
    >
      {title || action ? (
        <CardHeader
          sx={{
            px: 6,
            pb: 0,
            "& .MuiCardHeader-action": {
              marginTop: 0,
              marginRight: 0,
            },
            "& .MuiCardHeader-content": {
              overflow: "hidden",
            },
            ...headerStyle,
          }}
          title={
            typeof title === "object" ? (
              title
            ) : (
              <Box
                component="h3"
                sx={{
                  color: "text.primary",
                  fontWeight: Fonts.SEMI_BOLD,
                  fontSize: 16,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  width: "100%",
                  ...titleStyle,
                }}
              >
                {title}
              </Box>
            )
          }
          action={
            typeof action === "object" ? (
              action
            ) : (
              <span {...actionStyle}>
                <Link
                  href="libs/components/src/lib/AppCard#"
                  color="secondary"
                  underline="none"
                  sx={{
                    fontSize: 14,
                    fontWeight: Fonts.MEDIUM,
                  }}
                >
                  {action}
                </Link>
              </span>
            )
          }
        />
      ) : null}
      <CardContent
        sx={{
          height: "100%",
          px: 6,
          "&:last-of-type": {
            pb: 4,
          },
          ...contentStyle,
        }}
      >
        {children}
      </CardContent>
      {footer ? (
        <CardActions
          sx={{
            px: 6,
            pb: 4,
            ...footerStyle,
          }}
        >
          {isValidElement(footer) ? (
            footer
          ) : (
            <Box
              component="span"
              sx={{ ml: footerPosition === "right" ? "auto" : 0 }}
            >
              <Link
                color="secondary"
                component="button"
                underline="none"
                sx={{
                  fontSize: 14,
                  fontWeight: Fonts.MEDIUM,
                }}
              >
                {footer}
              </Link>
            </Box>
          )}
        </CardActions>
      ) : null}
    </Card>
  );
};

export default AppCard;
