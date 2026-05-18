import { Colors } from "../../../constants/Colors";
import type { Vaccine } from "../types/Vaccine";
import VaccineRow from "./VaccineRow";

const VaccineTable: React.FC<{ vaccines: Vaccine[], onDeleted: () => void }> = ({ vaccines, onDeleted }) => {
    const styles: any = {
            table: {
                width: "100%",
                borderCollapse: "separate",
                borderSpacing: "0 10px"
            },  
            headerCell: {
                fontSize: 18, 
                color: Colors.text_secondary,
                textAlign: "left",
                paddingBottom: 12
            }
        };
    return (
        <table style={styles.table}>
        <thead>
            <tr>
            <th style={styles.headerCell}>ID</th>
            <th style={styles.headerCell}>Name</th>
            <th style={styles.headerCell}>Quantity</th>
            <th style={styles.headerCell}>Species</th>
            <th style={styles.headerCell}>Max Doses</th>
            </tr>
        </thead>

        <tbody>
            {vaccines.map((v) => (
                <VaccineRow key={v.id} vaccine={v} onDeleted={onDeleted} />
            ))}
        </tbody>
        </table>
  );
}

export default VaccineTable;