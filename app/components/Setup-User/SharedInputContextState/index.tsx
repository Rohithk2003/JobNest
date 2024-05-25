import React, { createContext, useState, useContext } from "react";
const SharedInputContextState = createContext();
export const useSharedState = () => {
	return useContext(SharedInputContextState);
};
export const SharedInputContextProvider = ({ children }) => {
	const [input, setInput] = useState({
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		cgpa: 0,
		bio: "",
		country: "",
	});
};
