import React, {useContext} from "react";
import {SeverityTypes, Snackbar} from "../snackbar/Snackbar";
import {AuthContext} from "../../context/AuthContext";
import {NavLink, useHistory} from "react-router-dom";
import {userAPI} from "../../api/UserAPI";
import {Button, Checkbox, FormControlLabel, IconButton, TextField as MUITextfield} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 28px;
`;

const TextField = styled(MUITextfield)`
  margin-bottom: 24px;
`;

const LoginOptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;


export function LoginForm(){
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [rememberUser, setRememberUser] = React.useState(false);
    const [formIsValid, setFormIsValid] = React.useState(false);
    const [snackbar, setSnackbar] = React.useState({open: false, message: "", severity: SeverityTypes.INFO});
    const authContext = useContext(AuthContext);
    const history = useHistory();

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    function onSubmit(event?: React.FormEvent<HTMLFormElement>) {
        userAPI.login(email, password, rememberUser).then(res => {
            if (!res.data) {
                setSnackbar({
                    open: true,
                    message: "Something went wrong, please try again",
                    severity: SeverityTypes.INFO
                })
                return;
            }
            authContext.setContextLogin(res.data.userId, res.data.token, res.data.role);
            history.push({pathname: "/", state: {tab: 0, fromOtherPage: true, message: res.data.message, severity: SeverityTypes.SUCCESS}});
        }).catch(err => {
            console.log(err)
            setSnackbar({open: true, message: err.response.data.message, severity: SeverityTypes.INFO})
        })
    }

    React.useEffect(() => {
        setFormIsValid(validateForm());
    }, [email, password]);

    function validateForm(): boolean {
        return !!(password && email);
    }

    function handleClickShowPassword() {
        setShowPassword(!showPassword);
    }

    function handleChangeCheckbox() {
        setRememberUser(!rememberUser)
    }

    return (
        <Form autoComplete="on">
            {/* USERNAME */}
            <TextField
                required
                autoFocus
                id="email"
                label="Email"
                value={email}
                onChange={handleChangeEmail}
                variant={"outlined"}
            />

            {/* PASSWORD */}
            <TextField
                required
                type={showPassword ? "text" : "password"}
                id="password"
                label="Password"
                value={password}
                onChange={handleChangePassword}
                variant={"outlined"}
                InputProps={{
                    endAdornment: (
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                        >
                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    )
                }}
            />

            {/* OPTIONS */}
            <LoginOptionsContainer>
                <FormControlLabel
                    control={
                        <Checkbox checked={rememberUser} onChange={handleChangeCheckbox}
                                  name="rememberUser"/>
                    }
                    label="Remember me"
                />
                {/*TODO: implement this https://dev.to/jahangeer/how-to-implement-password-reset-via-email-in-node-js-132m*/}
                <NavLink to={"/password-reset"}>Forgot your password?</NavLink>
            </LoginOptionsContainer>

            <ButtonContainer>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => onSubmit()}
                    disabled={!formIsValid}
                    disableElevation
                >
                    LOGIN
                </Button>
            </ButtonContainer>
            <Snackbar {...snackbar} />
        </Form>
    );
}