import { Header } from "../../components/layout/Header";

export function HomePage() {
    return (
        <>
            <Header
                companyName="Delivery Template"
                logo="https://placehold.co/80x80/png"
            />

            <main style={{ padding: "24px" }}>
                <h1>Bem-vinda ao Delivery Template</h1>

                <p>Seu sistema profissional de delivery começou!</p>
            </main>
        </>
    );
}