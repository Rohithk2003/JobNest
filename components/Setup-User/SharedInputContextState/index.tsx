import React, { useContext, useState, createContext, ReactNode } from "react";

export interface inputType {
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	cgpa: number;
	bio: string;
	country: string;
	dob: Date;
	city: string;
	gender: string;
	interests: string[];
}
interface InputContextValue {
	input: inputType;
	setInput: React.Dispatch<React.SetStateAction<inputType>>;
}

const InputContext = createContext<InputContextValue | undefined>(undefined);

export const useInput = () => {
	const context = useContext(InputContext);
	if (!context) {
		throw new Error("useInput must be used within a InputProvider");
	}
	return context;
};
interface InputProviderProps {
	children: ReactNode;
}

export const InputProvider: React.FC<InputProviderProps> = ({ children }) => {
	const [input, setInput] = useState<inputType>({
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		cgpa: 0,
		gender: "",
		dob: new Date(),
		city: "",
		bio: "",
		country: "",
		interests: [],
	});

	return (
		<InputContext.Provider value={{ input, setInput }}>
			{children}
		</InputContext.Provider>
	);
};
