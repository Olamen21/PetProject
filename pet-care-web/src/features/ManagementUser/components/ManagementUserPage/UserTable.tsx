import React from "react";
import UserRow from "./UserRow";
import { Colors } from "../../../../constants/Colors";
import type { User } from "../../../../shared/types/User";

interface Props {
  users: User[];
}

const UserTable: React.FC<Props> = ({ users }) => {
  const styles: Record<string, React.CSSProperties> = {
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: "0 10px",
    },
    headerCell: {
      fontSize: 18,
      color: Colors.text_secondary,
      textAlign: "left",
      paddingBottom: 12,
    },
  };
  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.headerCell}>ID</th>
          <th style={styles.headerCell}>Full Name</th>
          <th style={styles.headerCell}>Email</th>
          <th style={styles.headerCell}>Role</th>
          <th style={styles.headerCell}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <UserRow key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
