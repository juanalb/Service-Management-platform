import React from "react";
import CircularProgress, {
  CircularProgressProps
} from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import styled from "styled-components";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import axios from "axios";

const MyCircularProgress = styled(CircularProgress)`
  width: 300px !important;
  height: 300px !important;
`;

interface ICircularProgress {
  unResolved?: number;
  total: number;
}

function CircularProgressWithLabel(props: ICircularProgress) {
  return (
    <Card>
      <CardHeader
        title="Unresolved incidents"
        subheader="All tickets currently open"
      />
      <CardContent>
        <Box position="relative" display="inline-flex">
          <MyCircularProgress variant="static" {...props} />
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

export default function CircularStatic() {
  const [progress, setProgress] = React.useState(0);
  const [unResolved, setUnResolved] = React.useState(0);
  const [total, setTotal] = React.useState(100);

  React.useEffect(() => {
    axios
      .get(`http://localhost:8080/api/incident/all`)
      .then(res => {
        console.log("call1")
        setTotal(res.data.data.length);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(`http://localhost:8080/api/incident/all`, {
        params: { isResolved: false }
      })
      .then(res => {
        console.log("call2")
        setUnResolved(res.data.data.length);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      // const progress = unResolved / total * 100;
      console.log(progress)
      setProgress(prevProgress =>
        prevProgress >= 70 ? 70 : prevProgress + 10
      );
    }, 100);
  }, []);

  return <CircularProgressWithLabel unResolved={unResolved} total={total} />;
}
