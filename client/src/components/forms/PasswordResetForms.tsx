import React from "react";
import {useHistory, useParams} from "react-router-dom";
import {userAPI} from "../../api/UserAPI";
import {Button, IconButton, LinearProgress, TextField as MUITextfield} from "@material-ui/core";
import styled from "styled-components";
import {ArrowBack, Visibility, VisibilityOff} from "@material-ui/icons";

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
  gap: 20px;
`;

const TextField = styled(MUITextfield)`
  margin-bottom: 24px;
`;

const ProgressBar = styled(LinearProgress)<{ loading: boolean }>`
  visibility: ${props => props.loading ? 'unset' : 'hidden'};
`;

export function PasswordResetEnterMail() {
    const [loading, setLoading] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [previewUrl, setPreviewUrl] = React.useState("");
    const [helperText, setHelperText] = React.useState("");
    const [error, setError] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [formIsValid, setFormIsValid] = React.useState(false);
    const history = useHistory();

    React.useEffect(() => {
        setFormIsValid(validateForm());
    }, [email]);

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    function onSubmit(event?: React.FormEvent<HTMLFormElement>) {
        setLoading(true)

        userAPI.sendRecovery(email).then(res => {
            setLoading(false)

            if (res.data.data.error) {
                setError(true);
                setHelperText(res.data.data.message)
                return;
            }


            setSuccess(true);
            setPreviewUrl(res.data.data.previewUrl);
        }).catch(err => {
            setError(true);
            setHelperText(err);
            setLoading(false)
        })
    }

    function validateForm(): boolean {
        const regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return regExp.test(String(email).toLowerCase());
    }

    return (
        <Form autoComplete="on">
            {success ?
                <>
                    <p>Recovery email sent, please check your mail</p>
                    <a href={previewUrl} target={"_blank"}>Preview email in browser</a>
                    <ButtonContainer>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => history.push("/")}
                            disabled={!formIsValid}
                            disableElevation
                        >
                            RETURN TO LOGIN
                        </Button>
                    </ButtonContainer>
                </>
                : <>
                    <TextField
                        required
                        autoFocus
                        id="email"
                        label="Email"
                        value={email}
                        onChange={handleChangeEmail}
                        variant={"outlined"}
                        error={error}
                        helperText={helperText}
                    />

                    <ProgressBar loading={loading}/>


                    <ButtonContainer>
                        {error &&
                            <Button
                                color="primary"
                                onClick={() => history.push("/login")}
                                startIcon={<ArrowBack/>}>
                                BACK
                            </Button>
                        }
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => onSubmit()}
                            disabled={!formIsValid}
                            disableElevation
                        >
                            SEND RECOVERY MAIL
                        </Button>
                    </ButtonContainer>
                </>
            }
        </Form>
    );
}

export function PasswordResetCreatePassword() {
    const [password, setPassword] = React.useState("");
    const [passwordVerify, setPasswordVerify] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [formIsValid, setFormIsValid] = React.useState(false);
    const [passwordMatch, setPasswordMatch] = React.useState(true);
    const [helperText, setHelperText] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const {userId, token} = useParams<{ userId: string, token: string }>();
    const [authorized, setAuthorized] = React.useState<boolean | null>(null);
    const [passwordChanged, setPasswordChanged] = React.useState(false);
    const history = useHistory();

    React.useEffect(() => {
        userAPI.validatePasswordRecoveryToken(userId, token).then(res => {
            if (res.data.data.error) {
                setMessage(res.data.data.message)
                setAuthorized(false)
                setLoading(false)
                setFormIsValid(true);
                return;
            }
            setAuthorized(true)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setMessage("Your password recovery link is expired, or an incorrect set of credentials has been provided. Please try again.")
            setLoading(false)
        })
    }, [])

    React.useEffect(() => {
        setFormIsValid(isValidForm())
    }, [password, passwordVerify]);


    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleChangePasswordVerify = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordVerify(event.target.value);
    };

    function handleClickShowPassword() {
        setShowPassword(!showPassword);
    }

    const onSubmitUpdatePassword = () => {
        setLoading(true);
        if (!validatePasswordMatch() || !validatePasswordIsStrong()) {
            setPasswordMatch(false);
            setLoading(false);

            if(!validatePasswordMatch()){
                setHelperText("Your passwords do not match.")
                return;
            }

            if(!validatePasswordIsStrong()){
                setHelperText("Your password do not match our safety criteria.")
                return;
            }
        }

        setPasswordMatch(true)

        if (authorized) {
            userAPI.updatePassword(password, userId, token).then(res => {
                setMessage(res.data.data.message)

                if (!res.data.data.error) {
                    setPasswordChanged(true);
                }
            }).catch(err => {
                console.log(err)
                setMessage("Something went wrong, please try again.")
            })
        } else {
            setMessage("Your password recovery link is expired, or an incorrect set of credentials has been provided. Please try again.")
        }
        setLoading(false);
    }

    function onSubmitReturnToLogin() {
        setLoading(true);
        history.push("/login")
    }

    function isValidForm(): boolean {
        return validatePasswordLengthMatch() && validatePasswordCorrectLength();
    }

    function validatePasswordMatch(): boolean {
        return password === passwordVerify;
    }

    function validatePasswordLengthMatch(): boolean {
        return password.length === passwordVerify.length;
    }

    function validatePasswordCorrectLength(): boolean {
        return password.length >= 3 && passwordVerify.length >= 3
    }

    function validatePasswordIsStrong(): boolean {
        //TODO: implement password strength check.
        return true;
    }

    return (
        <Form autoComplete="on">
            {message && <p>{message}</p>}
            {authorized && !passwordChanged && <>
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

                <TextField
                    required
                    type={"password"}
                    id="passwordVerify"
                    label="Verify password"
                    value={passwordVerify}
                    onChange={handleChangePasswordVerify}
                    variant={"outlined"}
                    error={!passwordMatch}
                    helperText={!passwordMatch && helperText}
                />

                <ProgressBar loading={loading}/>
            </>
            }

            <ButtonContainer>
                <Button
                    color="primary"
                    variant="contained"
                    disableElevation
                    disabled={!formIsValid}
                    onClick={passwordChanged || !authorized ? () => onSubmitReturnToLogin() : () => onSubmitUpdatePassword()}
                >
                    {passwordChanged || !authorized ? "RETURN TO LOGIN" : "CHANGE PASSWORD"}
                </Button>
            </ButtonContainer>
        </Form>
    );
}