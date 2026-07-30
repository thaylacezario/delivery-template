import { useEffect, useMemo, useRef, useState } from "react";
import type { StoreSettings } from "../../../data/storeSettings";
import styles from "./StoreInfo.module.css";

type StoreInfoProps = {
    store: StoreSettings;
};

const dayNames = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

function getMinutes(time: string) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

function getCurrentSchedule(schedules: StoreSettings["schedules"], currentDate: Date) {
    const currentDay = dayNames[currentDate.getDay()];

    return schedules.find((schedule) => schedule.day.toLowerCase() === currentDay.toLowerCase());
}

export function StoreInfo({ store }: StoreInfoProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [now, setNow] = useState(() => new Date());
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const intervalId = window.setInterval(() => setNow(new Date()), 60000);
        return () => window.clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const currentSchedule = useMemo(() => getCurrentSchedule(store.schedules, now), [store.schedules, now]);

    const isCurrentlyOpen = useMemo(() => {
        if (!currentSchedule || !currentSchedule.enabled) {
            return false;
        }

        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        const openMinutes = getMinutes(currentSchedule.openTime);
        const closeMinutes = getMinutes(currentSchedule.closeTime);

        if (openMinutes <= closeMinutes) {
            return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
        }

        return currentMinutes >= openMinutes || currentMinutes < closeMinutes;
    }, [currentSchedule, now]);

    const addressSummary = `${store.address.street}, ${store.address.number} - ${store.address.neighborhood}`;

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            <div className={styles.infoRow}>
                <p className={styles.address}>{addressSummary}</p>

                <div className={styles.metaRow}>
                    <span className={`${styles.status} ${isCurrentlyOpen ? styles.open : styles.closed}`}>
                        <span className={styles.dot} />
                        {isCurrentlyOpen ? "Aberto agora" : "Fechado no momento"}
                    </span>

                    <button
                        type="button"
                        className={styles.toggle}
                        aria-expanded={isOpen}
                        onClick={() => setIsOpen((current) => !current)}
                    >
                        <span>Ver horários</span>
                        <span className={`${styles.caret} ${isOpen ? styles.caretOpen : ""}`}>⌄</span>
                    </button>
                </div>
            </div>

            <div
                className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : styles.dropdownClosed}`}
                role="list"
                aria-label="Horários de funcionamento"
            >
                {store.schedules.map((schedule) => (
                    <div key={schedule.day} className={styles.dropdownItem}>
                        <span>{schedule.day}</span>
                        <span className={styles.scheduleValue}>
                            {schedule.enabled ? `${schedule.openTime}–${schedule.closeTime}` : "Fechado"}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
