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
