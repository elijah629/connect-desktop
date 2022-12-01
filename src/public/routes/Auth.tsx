import { Auth as FirebaseAuth } from "firebase/auth";
import * as React from "react";
interface AuthProps {
	auth: FirebaseAuth;
}

export class Auth extends React.Component<AuthProps> {
	render() {
		return "Auth";
	}
}

// TODO: Test if memory router saves on reload, use timer to change navigation
