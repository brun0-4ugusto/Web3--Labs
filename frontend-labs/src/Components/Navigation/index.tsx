import { Link } from "react-router-dom";
import styles from "./Navigation.module.css"

export default function Navigation(){
    const rotas = [
        {
          label: "Concurso de Sorte",
          to: "/lottery",
        },
      ];

      return(
        <nav className={styles.header__nav}>
        <ul>
          {rotas.map((rota, index) => (
            <li key={index}>
              <Link to={rota.to}>{rota.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      )
}