// app/otp/[id]/page.jsx
import OtpClient from "./OtpClient";

const OtpPage = ({ params }) => {
  const { id: userId } = params;

  return <OtpClient userId={userId} />;
};

export default OtpPage;
