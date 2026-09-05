const formatDate = (date: NativeDate) => {
  return new Date(date).toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });
};

// Generate Account Created HTML
export const generateAccountCreatedHtml = ({
  fullName,
  email,
  created_at,
  agent,
}: {
  fullName: string;
  email: string;
  created_at: NativeDate;
  agent: string;
}) => {
  const formattedDate = formatDate(created_at);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Account Created</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f8fc;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:12px;overflow:hidden;
          box-shadow:0 4px 12px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td
              style="background:linear-gradient(135deg,#4DA6FF,#1E88E5);
              padding:30px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;">
                Welcome 🎉
              </h1>
              <p style="margin-top:10px;color:#eaf4ff;font-size:16px;">
                Your account has been successfully created
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:35px;">
              <h2 style="margin-top:0;color:#1E3A5F;">
                Hello ${fullName},
              </h2>

              <p style="font-size:15px;line-height:1.7;color:#555;">
                Thank you for joining us. Your account is now active and ready
                to use.
              </p>

              <table
                width="100%"
                cellpadding="10"
                cellspacing="0"
                style="margin:25px 0;border:1px solid #d9e8ff;
                border-radius:8px;background:#f8fbff;">
                <tr>
                  <td><strong>Full Name</strong></td>
                  <td>${fullName}</td>
                </tr>
                <tr>
                  <td><strong>Email</strong></td>
                  <td>${email}</td>
                </tr>
                <tr>
                  <td><strong>Created At</strong></td>
                  <td>${formattedDate}</td>
                </tr>
                <tr>
                  <td><strong>Device / Browser</strong></td>
                  <td>${agent}</td>
                </tr>
              </table>

              <p style="font-size:15px;line-height:1.7;color:#555;">
                If you did not create this account, please contact our support
                team immediately.
              </p>

              <div style="text-align:center;margin:35px 0;">
                <a href="#"
                  style="display:inline-block;background:#4DA6FF;
                  color:#ffffff;text-decoration:none;
                  padding:14px 28px;border-radius:8px;
                  font-weight:bold;">
                  Go to Dashboard
                </a>
              </div>

              <p style="font-size:14px;color:#777;">
                We're excited to have you on board.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              style="background:#eef6ff;padding:20px;text-align:center;
              color:#666;font-size:13px;">
              © ${new Date().getFullYear()} Airbnb. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  return html;
};

export const generateAccountLoggedInHtml = ({
  fullName,
  email,
  logged_in_at,
  agent,
}: {
  fullName: string;
  email: string;
  logged_in_at: NativeDate;
  agent: string;
}) => {
  const formattedDate = formatDate(logged_in_at);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>New Login Detected</title>
</head>

<body style="margin:0;padding:0;background-color:#f4f8fc;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table
          width="600"
          cellpadding="0"
          cellspacing="0"
          style="
            background:#ffffff;
            border-radius:12px;
            overflow:hidden;
            box-shadow:0 4px 12px rgba(0,0,0,0.08);
          "
        >
          <!-- Header -->
          <tr>
            <td
              style="
                background:linear-gradient(135deg,#4DA6FF,#1E88E5);
                padding:30px;
                text-align:center;
              "
            >
              <h1 style="margin:0;color:#ffffff;font-size:28px;">
                New Login Detected 🔐
              </h1>

              <p style="margin-top:10px;color:#eaf4ff;font-size:16px;">
                We noticed a successful sign in to your account
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:35px;">
              <h2 style="margin-top:0;color:#1E3A5F;">
                Hello ${fullName},
              </h2>

              <p style="font-size:15px;line-height:1.7;color:#555;">
                Your account was successfully accessed. Below are the details
                of the recent login activity.
              </p>

              <table
                width="100%"
                cellpadding="10"
                cellspacing="0"
                style="
                  margin:25px 0;
                  border:1px solid #d9e8ff;
                  border-radius:8px;
                  background:#f8fbff;
                "
              >
                <tr>
                  <td><strong>Full Name</strong></td>
                  <td>${fullName}</td>
                </tr>

                <tr>
                  <td><strong>Email</strong></td>
                  <td>${email}</td>
                </tr>

                <tr>
                  <td><strong>Login Time</strong></td>
                  <td>${formattedDate}</td>
                </tr>

                <tr>
                  <td><strong>Device / Browser</strong></td>
                  <td>${agent}</td>
                </tr>
              </table>

              <p style="font-size:15px;line-height:1.7;color:#555;">
                If this login was performed by you, no further action is
                required.
              </p>

              <p
                style="
                  font-size:15px;
                  line-height:1.7;
                  color:#d32f2f;
                  font-weight:bold;
                "
              >
                If you do not recognize this login, please change your password
                immediately and review your account activity.
              </p>

              <div style="text-align:center;margin:35px 0;">
                <a
                  href="#"
                  style="
                    display:inline-block;
                    background:#4DA6FF;
                    color:#ffffff;
                    text-decoration:none;
                    padding:14px 28px;
                    border-radius:8px;
                    font-weight:bold;
                  "
                >
                  Secure My Account
                </a>
              </div>

              <p style="font-size:14px;color:#777;">
                This notification was sent to help keep your account secure.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              style="
                background:#eef6ff;
                padding:20px;
                text-align:center;
                color:#666;
                font-size:13px;
              "
            >
              © ${new Date().getFullYear()} Airbnb. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  return html;
};

export const generateBookingCreatedHtml = ({
  guestName,
  propertyName,
  propertyAddress,
  bookingReference,
  checkIn,
  checkOut,
  totalPrice,
}: {
  guestName: string;
  propertyName: string;
  propertyAddress: {
    country: string;
    city: string;
    street_name: string;
    zipcode: string;
  };
  bookingReference: string;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
}) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Booking Confirmed</title>
</head>

<body style="font-family:Arial,Helvetica,sans-serif;background:#f4f8fc;padding:20px;">
  <table width="600" align="center" style="background:white;border-radius:12px;overflow:hidden;">
    
    <tr>
      <td style="background:linear-gradient(135deg,#4DA6FF,#1E88E5);padding:30px;text-align:center;">
        <h1 style="color:white;margin:0;">
          Booking Confirmed 🎉
        </h1>
      </td>
    </tr>

    <tr>
      <td style="padding:30px;">
        <h2>Hello ${guestName},</h2>

        <p>
          Your booking has been successfully created.
        </p>

        <table width="100%" cellpadding="8">
          <tr>
            <td><strong>Booking Reference</strong></td>
            <td>${bookingReference}</td>
          </tr>

          <tr>
            <td><strong>Property</strong></td>
            <td>${propertyName}</td>
          </tr>

          <tr>
            <td><strong>Address</strong></td>
             <td>
              ${propertyAddress.street_name}, ${propertyAddress.city}, ${propertyAddress.zipcode}, ${propertyAddress.country}
            </td>
          </tr>

          <tr>
            <td><strong>Check In</strong></td>
            <td>${formatDate(checkIn)}</td>
          </tr>

          <tr>
            <td><strong>Check Out</strong></td>
            <td>${formatDate(checkOut)}</td>
          </tr>

          <tr>
            <td><strong>Total Price</strong></td>
            <td>$${totalPrice}</td>
          </tr>
        </table>

        <p>
          Please keep your booking reference for future communication.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};

export const generateHostBookingNotificationHtml = ({
  hostName,
  guestName,
  guestEmail,
  propertyName,
  bookingReference,
  checkIn,
  checkOut,
  totalPrice,
}: {
  hostName: string;
  guestName: string;
  guestEmail: string;
  propertyName: string;
  bookingReference: string;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
}) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>New Booking Received</title>
</head>

<body style="font-family:Arial,Helvetica,sans-serif;background:#f4f8fc;padding:20px;">
  <table width="600" align="center" style="background:white;border-radius:12px;overflow:hidden;">
    
    <tr>
      <td style="background:linear-gradient(135deg,#4DA6FF,#1E88E5);padding:30px;text-align:center;">
        <h1 style="color:white;margin:0;">
          New Booking Received 🏠
        </h1>
      </td>
    </tr>

    <tr>
      <td style="padding:30px;">
        <h2>Hello ${hostName},</h2>

        <p>
          A guest has booked your property.
        </p>

        <table width="100%" cellpadding="8">
          <tr>
            <td><strong>Booking Reference</strong></td>
            <td>${bookingReference}</td>
          </tr>

          <tr>
            <td><strong>Property</strong></td>
            <td>${propertyName}</td>
          </tr>

          <tr>
            <td><strong>Guest Name</strong></td>
            <td>${guestName}</td>
          </tr>

          <tr>
            <td><strong>Guest Email</strong></td>
            <td>${guestEmail}</td>
          </tr>

          <tr>
            <td><strong>Check In</strong></td>
            <td>${formatDate(checkIn)}</td>
          </tr>

          <tr>
            <td><strong>Check Out</strong></td>
            <td>${formatDate(checkOut)}</td>
          </tr>

          <tr>
            <td><strong>Total Booking Value</strong></td>
            <td>$${totalPrice}</td>
          </tr>
        </table>

        <p>
          Please review this booking from your host dashboard.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};
