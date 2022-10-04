import { GoogleLogin } from "@react-oauth/google";
import { useSelector } from "react-redux";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import { useAppDispatch } from "redux/hooks";
import { signIn } from "redux/slices/usersSlice";
import { RootState } from "redux/store";
import { Navigate } from "react-router-dom";

export default function Login() {
    const dispatch = useAppDispatch();

    const user = useSelector((state: RootState) => state.users.loggedIn)

    return (
        <div>
            <Card>
                <CardContent>
                    {!user._id &&
                        <GoogleLogin
                            onSuccess={(
                                credentialResponse
                            ) => {
                                if (
                                    credentialResponse.credential
                                ) {
                                    console.log(
                                        "login succes",
                                        credentialResponse.credential
                                    );

                                    dispatch(
                                        signIn(
                                            credentialResponse.credential
                                        )
                                    );
                                }
                            }}
                            onError={() => {
                                console.log(
                                    "Login Failed"
                                );
                            }}
                        />
                    }
                    {user._id &&
                        <div>
                            <h1>You are already logged in</h1>
                            <Navigate to="/" replace />
                        </div>
                    }
                </CardContent>
            </Card>
        </div>
    )
}
