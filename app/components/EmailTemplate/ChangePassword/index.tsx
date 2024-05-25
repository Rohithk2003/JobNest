import React from "react";

interface ChangePasswordEmailProps {
	resetLink: string;
}

const ChangePasswordEmail: React.FC<Readonly<ChangePasswordEmailProps>> = ({
	resetLink,
}: ChangePasswordEmailProps) => {
	return (
		<div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
			<table
				width="100%"
				cellPadding="0"
				cellSpacing="0"
				style={{
					maxWidth: "600px",
					margin: "0 auto",
					padding: "20px",
					border: "1px solid #e0e0e0",
				}}
			>
				<tr>
					<td
						style={{
							padding: "20px 0",
							textAlign: "center",
							backgroundColor: "#f7f7f7",
						}}
					>
						<h1 style={{ margin: 0, color: "#333" }}>Change Password</h1>
					</td>
				</tr>
				<tr>
					<td style={{ padding: "20px", backgroundColor: "#ffffff" }}>
						<p
							style={{ margin: "0 0 20px 0", fontSize: "16px", color: "#333" }}
						>
							Hello,
						</p>
						<p
							style={{ margin: "0 0 20px 0", fontSize: "16px", color: "#333" }}
						>
							You requested to change your password. Please click the button
							below to reset your password.This token is valid only for 5
							minutes.
						</p>
						<p style={{ margin: "0 0 20px 0", textAlign: "center" }}>
							<a
								href={resetLink}
								style={{
									display: "inline-block",
									padding: "10px 20px",
									fontSize: "16px",
									color: "#fff",
									backgroundColor: "#007bff",
									textDecoration: "none",
									borderRadius: "5px",
								}}
							>
								Reset Password
							</a>
						</p>
						<p
							style={{ margin: "0 0 20px 0", fontSize: "16px", color: "#333" }}
						>
							If you did not request this change, you can ignore this email.
						</p>
						<p style={{ margin: "0", fontSize: "16px", color: "#333" }}>
							Best regards,
							<br />
							JobNest
						</p>
					</td>
				</tr>
				<tr>
					<td
						style={{
							padding: "20px 0",
							textAlign: "center",
							backgroundColor: "#f7f7f7",
							fontSize: "12px",
							color: "#777",
						}}
					>
						© {new Date().getFullYear()} JobNest. All rights reserved.
					</td>
				</tr>
			</table>
		</div>
	);
};

export default ChangePasswordEmail;
