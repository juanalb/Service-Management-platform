import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    Container,
} from "@material-ui/core";

interface LoginProps {
    title: string
}

export function Login(props: React.PropsWithChildren<LoginProps>) {
    return (
        <Container maxWidth="xs" style={{ marginTop: "96px" }}>
            <Card>
                <CardHeader title={props.title}/>
                <CardContent>
                    {props.children}
                </CardContent>
            </Card>
        </Container>
    );
}
