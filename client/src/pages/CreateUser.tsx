import React from "react";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    IconButton,
    MenuItem,
    TextField as MUITextfield
} from "@material-ui/core";
import styled from "styled-components";
import {userAPI} from "../api/UserAPI";
import {SeverityTypes, Snackbar} from "../components/snackbar/Snackbar";
import {useHistory} from "react-router-dom";
import {Visibility, VisibilityOff} from "@material-ui/icons";

interface ICreateUser {}

const buildings = [
    {
        value: "Amsterdam",
        label: "Amsterdam"
    },
    {
        value: "Haarlem",
        label: "Haarlem"
    },
    {
        value: "Knuppeldam",
        label: "Knuppeldam"
    },
    {
        value: "HQ",
        label: "HQ"
    }
];

const roles = [
    {
        value: "Service Desk Employee",
        label: "Service Desk Employee"
    },
    {
        value: "Regular Employee",
        label: "Regular Employee"
    }
];

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: flex-end;
  margin-top: 28px;
`;

const TextField = styled(MUITextfield)`
  margin-bottom: 24px;
`;

export function CreateUser(props: ICreateUser) {
    const [email, setEmail] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [building, setBuilding] = React.useState(buildings[0].value);
    const [password, setPassword] = React.useState("");
    const [passwordVerify, setPasswordVerify] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [role, setRole] = React.useState(roles[0].value);

    const [success, setSuccess] = React.useState(false);
    const [failure, setFailure] = React.useState(false);
    const [formIsValid, setFormIsValid] = React.useState(false);
    const history = useHistory();

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    };

    const handleChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    };

    const handleChangeBuilding = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBuilding(event.target.value);
    };

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleChangePasswordVerify = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordVerify(event.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChangePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value);
    };

    const handleChangeRole = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRole(event.target.value);
    };

    function onSubmit(event?: React.FormEvent<HTMLFormElement>) {
        const requestBody = {
            email,
            firstName,
            lastName,
            building,
            password,
            phoneNumber,
            role
        };

        userAPI.createUser(email, firstName, lastName, building, password, phoneNumber, role).then(res => {
            setSuccess(true)
            history.push({pathname: "/", state: {tab: 2, fromOtherPage: true, message: "User creation successful", severity: SeverityTypes.SUCCESS}});
        }).catch(e => {
            setFailure(e)
        })
    }

    React.useEffect(() => {
        setFormIsValid(validateForm());
    }, [email, firstName, lastName, building, password, passwordVerify, phoneNumber, role]);

    function validateForm(): boolean {
        return ((email &&
            firstName &&
            lastName &&
            building &&
            password &&
            passwordVerify &&
            phoneNumber &&
            role) ? true : false) && password === passwordVerify;
    }

    // @ts-ignore
    return (
        <Container maxWidth="sm" style={{ marginTop: "96px" }}>
            <Card>
                <CardHeader
                    title="Create a new user"
                    subheader="Fill in all the required incident details"
                />
                <CardContent>
                    <Form autoComplete="on">
                        {/* SUBJECT */}
                        <TextField
                            required
                            id="email"
                            label="Email"
                            value={email}
                            onChange={handleChangeEmail}
                        />

                        {/* FIRST NAME */}
                        <TextField
                            required
                            id="firstName"
                            label="First name"
                            value={firstName}
                            onChange={handleChangeFirstName}
                        />

                        {/* LAST NAME */}
                        <TextField
                            required
                            id="lastName"
                            label="Last name"
                            value={lastName}
                            onChange={handleChangeLastName}
                        />

                        {/* BUILDING */}
                        <TextField
                            id="type"
                            select
                            required
                            label="Building"
                            value={building}
                            onChange={handleChangeBuilding}
                        >
                            {buildings.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/* PASSWORD VERIFY */}
                        <TextField
                            required
                            type={showPassword ? "text" : "password"}
                            id="password"
                            label="Password"
                            value={password}
                            onChange={handleChangePassword}
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

                        {/* PASSWORD */}
                        <TextField
                            required
                            id="passwordVerify"
                            label="Verify password"
                            value={passwordVerify}
                            onChange={handleChangePasswordVerify}
                        />

                        {/* PHONE NUMBER*/}
                        <TextField
                            required
                            id="phoneNumber"
                            label="Phone number"
                            value={phoneNumber}
                            onChange={handleChangePhoneNumber}
                        />

                        {/* DEADLINE*/}
                        <TextField
                            id="role"
                            select
                            required
                            label="Role"
                            value={role}
                            onChange={handleChangeRole}
                        >
                            {roles.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <ButtonContainer>
                            <Button
                                color="secondary"
                                variant="outlined"
                                onClick={() => history.push({pathname: "/", state: {tab: 2}})}
                            >
                                CANCEL
                            </Button>

                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => onSubmit()}
                                disabled={!formIsValid}
                                disableElevation
                            >
                                CREATE NEW USER
                            </Button>
                        </ButtonContainer>
                    </Form>
                </CardContent>
                <Snackbar
                    open={failure}
                    message="User creation failed, please try again"
                    severity={SeverityTypes.WARNING}
                />
            </Card>
        </Container>
    );
}
