type HeaderProps = {
    companyName: string;
    logo: string;
};

export function Header({ companyName, logo }: HeaderProps) {
    return (
        <header
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
                backgroundColor: "#FFFFFF",
                borderBottom: "1px solid #E2E8F0",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                }}
            >
                <img
                    src={logo}
                    alt={companyName}
                    width={48}
                    height={48}
                    style={{ borderRadius: "50%" }}
                />

                <h2>{companyName}</h2>
            </div>

            <button>🛒</button>
        </header>
    );
}