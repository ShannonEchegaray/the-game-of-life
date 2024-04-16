import React, { useEffect, useState } from 'react'
import styles from "./app.module.css";
import { CELL_SIZE, QUANTITY, SIDES, STEP } from './consts';
import { createNewBoard } from './utils/board';

type Board = boolean[][];
type Phases = "SETUP" | "PLAYING" | "FINISHED";

const App: React.FC = () => {
  const [board, setBoard] = useState<Board>(createNewBoard);
  const [generation, setGenerations] = useState(0);
  const [phase, setPhase] = useState<Phases>("SETUP");

  const handleClick = (x: number, y: number) => {
    const clone = structuredClone(board);
    const isAlive = clone[y][x];
    clone[y][x] = !isAlive;
    setBoard(clone);
  }

  const handlePlay = () => {
    setPhase("PLAYING");
  }

  const handleReset = () => {
    setPhase("SETUP");
    setGenerations(0);
    setBoard(createNewBoard());
  }
  
  useEffect(() => {
    const handleUpdate = () => {
      const isAlive = board.some((row) => row.some((cell) => cell));
      const clone = board.map((row, y) => row.map((cell, x) => {
        const alives = SIDES.filter((side) => {
          const [sideY, sideX] = side;
          const resultY = sideY + y;
          const resultX = sideX + x;
          if(resultX < 0 || resultY < 0) return false;
          if(resultX >= QUANTITY || resultY >= QUANTITY) return false;
          return board[resultY][resultX];
        }).length
        if(cell){
          if(alives > 3) return false;
          if(alives <= 1) return false;
          return cell
        } else {
          if(alives === 3) return true;
          return cell
        }
      }))
      setBoard(clone);
      setGenerations((generation) => generation + 1)
      if(!isAlive || JSON.stringify(board) === JSON.stringify(clone)) setPhase("FINISHED")
    }

    if(phase === "PLAYING"){
      const id = setInterval(() => {
        handleUpdate()
      }, 20)

      return () => clearInterval(id)
    }
  }, [phase, board])

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <p>{(phase !== "SETUP") && generation}</p>
        <p>{phase === "PLAYING" && "En juego"}</p>
        <p>{phase === "FINISHED" && "Finalizado"}</p>
      </div>
      <div style={{
        display: "grid",
        gap: `${STEP}px`,
        gridTemplateColumns: `repeat(${QUANTITY}, ${CELL_SIZE}px)`,
        gridTemplateRows: `repeat(${QUANTITY}, ${CELL_SIZE}px)`
      }}>
        {
          board.flatMap((row, y) => {
            return row.map((cell, x) => (
              <Cell
                key={`${x}-${y}`}
                isAlive={cell} 
                onClick={phase === "SETUP" ? () => handleClick(x, y) : undefined}
              />
            ))
          })
        }
      </div>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={handlePlay}>Iniciar</button>
        <button className={styles.button} onClick={handleReset}>Reiniciar</button>
      </div>
    </main>
  )
}

export default App

interface CellProps {
  isAlive: boolean
  onClick?: () => void
}

const Cell: React.FC<CellProps> = ({ isAlive, onClick }) => {
  return (
    <div 
      onClick={onClick}
      style={{
        background: isAlive ? "white" : "black"
      }}
    >

    </div>
  )
}