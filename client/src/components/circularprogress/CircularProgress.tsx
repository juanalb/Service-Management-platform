import React from "react";
import { CircularProgress as MUICircularProgress} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import styled from "styled-components";
import { Card, CardContent as MUICardContent, CardHeader } from "@material-ui/core";

interface ICircularCard {
  title: string;
  subtitle: string;
  unResolved?: number;
  total: number;
  value?: number;
}

const CardContent = styled(MUICardContent)`
  display: flex;
  justify-content: center;
`;

const CircularProgress = styled(MUICircularProgress)`
  width: 300px !important;
  height: 300px !important;
  color: ${(props: ICircularCard) => props.unResolved ? "" : "#f50057"};
`;

export function CircularCard(props: ICircularCard) {
  return (
    <Card>
      <CardHeader
        title={props.title}
        subheader={props.subtitle}
      />
      <CardContent>
        <Box position="relative" display="inline-flex">
          <CircularProgress variant="static" {...props} />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h2" component="div">
              {props.unResolved && props.total
                ? `${props.unResolved}/${props.total}`
                : props.total}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}