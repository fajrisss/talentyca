import { useState } from "react";
import IMG from "./assets/user.png";
import "./App.css";

function App() {
  const [penilaian, setPenilaian] = useState({
    Aspek_Penilaian_1: {},
    Aspek_Penilaian_2: {},
    Aspek_Penilaian_3: {},
    Aspek_Penilaian_4: {},
  });

  const handlePenilaianChange = (aspek, mahasiswa, value) => {
    setPenilaian((prevState) => ({
      ...prevState,
      [aspek]: {
        ...prevState[aspek],
        [mahasiswa]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedOutput = {};

    Object.keys(penilaian).forEach((aspek) => {
      const aspekData = {};

      Object.keys(penilaian[aspek]).forEach((mahasiswa) => {
        aspekData[`mahasiswa_${mahasiswa}`] = penilaian[aspek][mahasiswa];
      });

      formattedOutput[aspek] = aspekData;
    });

    console.log(JSON.stringify(formattedOutput));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center" }}>Aplikasi Penilaian Mahasiswa</h2>

        <table style={{ margin: "auto" }}>
          <thead>
            <tr className="judul">
              <th></th>
              <th style={{ width: "100px" }}>Aspek penilaian 1</th>
              <th style={{ width: "100px" }}>Aspek penilaian 2</th>
              <th style={{ width: "100px" }}>Aspek penilaian 3</th>
              <th style={{ width: "100px" }}>Aspek penilaian 4</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((mahasiswa) => (
              <tr
                key={mahasiswa}
                style={{
                  border: "1px solid black",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  height: "50px",
                }}
              >
                <td
                  style={{
                    padding: "0 50px 0 15px",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    margin: "20px",
                  }}
                >
                  <img
                    src={IMG}
                    alt=""
                    style={{ width: 20, height: 20, marginRight: "10px" }}
                  />
                  Mahasiswa {mahasiswa}
                </td>

                {Object.keys(penilaian).map((aspek) => (
                  <td key={aspek}>
                    <select
                      value={penilaian[aspek][mahasiswa] || ""}
                      onChange={(e) =>
                        handlePenilaianChange(aspek, mahasiswa, e.target.value)
                      }
                    >
                      <option value="">Pilih nilai</option>
                      {Array.from({ length: 10 }, (_, i) => i + 1).map(
                        (nilai) => (
                          <option
                            key={nilai}
                            value={nilai}
                          >{` ${nilai}`}</option>
                        )
                      )}
                    </select>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <button
          type="submit"
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "6px",
            fontSize: "16px",
            margin: 'auto',
            display: 'block',
            marginTop: '20px',
            marginBottom: '20px',
          }}
        >
          Simpan
        </button>
      </form>
    </div>
  );
}

export default App;
