import React, { useContext, createContext, useState, ReactNode } from "react";

export interface InfoAddedStatus {
	isInfoAdded: boolean;
	setIsInfoAdded: React.Dispatch<React.SetStateAction<boolean>>;
}
const InfoAddedContext = createContext<InfoAddedStatus | undefined>(undefined);
export const useInfoAdded = () => {
	const context = useContext(InfoAddedContext);
	if (!context) {
		throw new Error("useInfoAdded must be used within a InfoAddedProvider");
	}
	return context;
};
export const InfoAddedProvider: React.FC<{ children: ReactNode }> = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [isInfoAdded, setIsInfoAdded] = useState<boolean>(false);
	return (
		<InfoAddedContext.Provider value={{ isInfoAdded, setIsInfoAdded }}>
			{children}
		</InfoAddedContext.Provider>
	);
};
