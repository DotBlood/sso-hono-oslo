import React from "react";

interface EmailTemplateProps {
  username: string;
  btnLink: string;
}

export const EmailVerifyAccount: React.FC<EmailTemplateProps> = ({
  username,
  btnLink,
}) => {
  const styles = {
    body: {
      fontFamily: '"Segoe UI", Roboto, Arial, sans-serif',
      margin: 0,
      padding: 0,
      color: "#333",
    } as React.CSSProperties,

    emailContainer: {
      border: "1px solid #cccccc",
      maxWidth: "600px",
      margin: "30px auto",
      background: "#ffffff",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    } as React.CSSProperties,

    header: {
      background: "linear-gradient(90deg, #6a11cb, #2575fc)",
      color: "#ffffff",
      textAlign: "center" as const,
      padding: "30px 20px",
      fontSize: "24px",
      fontWeight: "bold",
    } as React.CSSProperties,

    content: {
      padding: "30px",
    } as React.CSSProperties,

    contentHeading: {
      color: "#6a11cb",
      fontSize: "22px",
      marginBottom: "15px",
    } as React.CSSProperties,

    contentText: {
      fontSize: "16px",
      lineHeight: "1.8",
      color: "#555555",
      marginBottom: "20px",
    } as React.CSSProperties,

    buttonContainer: {
      marginTop: "20px",
    } as React.CSSProperties,

    button: {
      display: "inline-block",
      padding: "15px 25px",
      background: "linear-gradient(90deg, #2575fc, #6a11cb)",
      color: "#ffffff",
      fontSize: "16px",
      fontWeight: "bold",
      textDecoration: "none",
      borderRadius: "8px",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    } as React.CSSProperties,

    footer: {
      background: "#f7f7f7",
      color: "#888888",
      textAlign: "center" as const,
      padding: "15px",
      fontSize: "14px",
      borderTop: "1px solid #ebebeb",
    } as React.CSSProperties,
  };

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={styles.body}>
        <div style={styles.emailContainer}>
          <div style={styles.header}>My-cloud ☁️</div>
          <div style={styles.content}>
            <h2 style={styles.contentHeading}>Привет, {username}!</h2>
            <p style={styles.contentText}>
              Спасибо за регистрацию в My-Cloud — вашем надежном облачном
              хранилище. Теперь вы можете хранить, делиться и управлять своими
              файлами безопасно и легко.
            </p>
            <p style={styles.contentText}>
              Остался последний шаг, чтобы активировать вашу учетную запись:
              подтвердите свою электронную почту. Это займет всего несколько
              секунд!
            </p>
            <div style={styles.buttonContainer}>
              <a href={btnLink} style={styles.button}>
                Подтвердить почту
              </a>
            </div>
            <p style={styles.contentText}>
              Если вы не регистрировались на My-Cloud, просто проигнорируйте это
              письмо.
            </p>
            <p style={styles.contentText}>
              С заботой,
              <br />
              Команда My-Cloud ☁️
            </p>
          </div>
          <div style={styles.footer}>
            <p>© 2024 My-Cloud. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  );
};
