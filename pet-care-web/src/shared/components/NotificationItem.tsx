import { IoSettingsSharp, IoCalendar } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { Colors } from "../../constants/Colors";

type NotiItemProps = {
  label: string;
  text: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
};

const NotificationItem: React.FC = () => {
    const notiItem: NotiItemProps[] = [
        {
            label: "Settings",
            text: "Update Dashboard",
            icon: <IoSettingsSharp />,
            color: Colors.text_tag_blue,
            onClick: () => console.log("Settings clicked"),
        },
        {
            label: "Event Update",
            text: "An event date update again",
            icon: <IoCalendar />,
            color: Colors.pink_light,
            onClick: () => console.log("Event Update clicked"),
        },
        {
            label: "Profile",
            text: "Update your profile",
            icon: <FaUser />,
            color: Colors.purple,
            onClick: () => console.log("Profile clicked"),
        },
        {
            label: "Application Error",
            text: "Check Your runnung application",
            icon: <MdError />,
            color: Colors.error,
            onClick: () => console.log("Application Error clicked"),
        },
    ]
    return (
        <div style={styles.container}>
            <div style={styles.textHeader}>Notification</div>
            <hr style={styles.line} />
            {notiItem.map((item, idx) => (
                <div
                    key={idx}
                    style={styles.menuItem}
                    onClick={item.onClick}
                >
                    <span style={{ ...styles.icon ,color: item.color}}>
                        {item.icon}
                    </span>
                    <div style={styles.textContainer}>
                        <span style={styles.textLabel}>{item.label}</span>
                        <span style={styles.subText}>{item.text}</span>
                    </div>
                </div>
            ))}
            <hr style={styles.line} />
            <div 
                onClick={() => console.log("See all notification click")}
                style={styles.click}
            >
                See all notification
            </div>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        position: "absolute",
        right: 20,
        top: 80,
        width: 220,
        backgroundColor: Colors.white,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        padding: 8,
    },
    textHeader: {
        fontSize: 15,
        color: Colors.text,
        fontWeight: "bold",
        padding: 5,
    },
    line: {
        border: "none", 
        borderTop: "1px solid " + Colors.border 
    },
    menuItem: {
        display: "flex",
        alignItems: "center",
        padding: "10px",
        cursor: "pointer",
        transition: "background 0.2s",
    },
    icon: {
        fontSize: "20px", 
        marginRight: "10px"
    },
    textContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 5,
    },
    textLabel: {
        fontSize: 14,
        color: Colors.text,
        fontWeight: "bold"
    },
    subText: {
        fontSize: 12,
        color: Colors.text_secondary,
    },
    click: {
        display: "flex",
        color: Colors.text_secondary,
        fontSize: 13,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
    }
}

export default NotificationItem;