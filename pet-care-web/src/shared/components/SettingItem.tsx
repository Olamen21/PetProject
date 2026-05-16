import { IoKeyOutline, IoLogOutOutline, IoPersonCircleOutline, IoRefreshOutline } from "react-icons/io5";
import { Colors } from "../../constants/Colors";

type MenuItemProps = {
  label: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
};

const MenuItem: React.FC = () => {
    const menuItems: MenuItemProps[] = [
        {
            label: "Manage Account",
            icon: <IoPersonCircleOutline />,
            color: Colors.text_tag_blue,
            onClick: () => console.log("Manage Account clicked"),
        },
        {
            label: "Change Password",
            icon: <IoKeyOutline />,
            color: Colors.red,
            onClick: () => console.log("Change Password clicked"),
        },
        {
            label: "Activity Log",
            icon: <IoRefreshOutline />,
            color: Colors.purple,
            onClick: () => console.log("Activity Log clicked"),
        },
        {
            label: "Log out",
            icon: <IoLogOutOutline />,
            color: Colors.error,
            onClick: () => console.log("Log out clicked"),
        },
    ];

    return (
        <div style={styles.accountMenu}>
            {menuItems.map((item, idx) => (
                <div
                    key={idx}
                    style={styles.menuItem}
                    onClick={item.onClick}
                >
                <span style={{ color: item.color, fontSize: "20px", marginRight: "10px" }}>
                    {item.icon}
                </span>
                <span>{item.label}</span>
                </div>
            ))}
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    accountMenu: {
        position: "absolute",
        right: 20,
        top: 80,
        width: 220,
        backgroundColor: Colors.white,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        padding: 8,
    },
    menuItem: {
        display: "flex",
        alignItems: "center",
        padding: "10px",
        cursor: "pointer",
        transition: "background 0.2s",
    }
}

export default MenuItem;