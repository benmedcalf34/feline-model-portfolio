'use client';
import { useState, useRef } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Cat = {
    catId: number;
    name: string;
    breed: string;
    color: string;
    weight: string;
    length: string;
    eyeColor: string;
    photo: string;
}
 
const catData: Cat[] = [
  {
    catId: 1,
    name: "Alex",
    breed: "American Shorthair",
    color: "Tabby",
    weight: "12 lbs",
    length: "18 inches",
    eyeColor: "Yellow-Orange",
    photo: "alex.jpg"
  },
  {
    catId: 2,
    name: "Bailey",
    breed: "British Shorthair",
    color: "White-Gray",
    weight: "10 lbs",
    length: "16 inches",
    eyeColor: "Green",
    photo: "bailey.jpg"
  },
  {
    catId: 3,
    name: "Charley",
    breed: "Persian Longhair",
    color: "White",
    weight: "14 lbs",
    length: "20 inches",
    eyeColor: "Green",
    photo: "charley.jpg"
  },
  {
    catId: 4,
    name: "Jamie",
    breed: "Scottish Fold",
    color: "Gray",
    weight: "13 lbs",
    length: "17 inches",
    eyeColor: "Hazel",
    photo: "jamie.jpg"
  },
  {
    catId: 5,
    name: "Lucky",
    breed: "American Shorthair",
    color: "Tabby",
    weight: "10 lbs",
    length: "16 inches",
    eyeColor: "Green",
    photo: "lucky.jpg"
  }
]

export default function Home() {
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const [showNewModelPopup, setShow] = useState(false);
  const datepickerRef = useRef(null);

  return (<>
    <div id='pageContainer'>
      <div className={styles.topButtonContainer}>
        <button onClick={() => setShow(true)}>Add Model</button>
      </div>
      <div className={styles.catModelContainer}>
        {catData.map((cat) => (
          <div className={styles.catModel} key={cat.catId} onClick={() => setSelectedCat(cat)}>
            <div className={styles.catAttribute}>Name: {cat.name}</div>
            <div className={styles.catAttribute}>Breed: {cat.breed}</div>
            <div className={styles.catAttribute}>Fur Color: {cat.color}</div>
            <div className={styles.catAttribute}>Eye Color: {cat.eyeColor}</div>
            <div className={styles.catAttribute}>Weight: {cat.weight}</div>
            <div className={styles.catAttribute}>Length: {cat.length}</div>
            <div className={styles.catImageContainer}>
              <Image src={`/images/${cat.photo}`}
                alt=""
                width={100}
                height={100}>
              </Image>
            </div>
          </div>
        ))}
        {selectedCat && (
          <div className={styles.overlay}>
            <div className={styles.popup}>
              <h2>{selectedCat.name}</h2>
              <div className={styles.catAttribute}>Breed: {selectedCat.breed}</div>
              <div className={styles.catAttribute}>Fur Color: {selectedCat.color}</div>
              <div className={styles.catAttribute}>Eye Color: {selectedCat.eyeColor}</div>
              <div className={styles.catAttribute}>Weight: {selectedCat.weight}</div>
              <div className={styles.catAttribute}>Length: {selectedCat.length}</div>
              <div className={styles.catImageContainer}>
                <Image src={`/images/${selectedCat.photo}`}
                  alt=""
                  width={100}
                  height={100}>
                </Image>
              </div>
              <div className={styles.buttonContainer}>
                <button onClick={() => { setSelectedCat(null); setOpen(false); setSelectedDate(null); }}>Close</button>
                <button onClick={() => setOpen((prev) => !prev)}>Book Appointment</button>
              </div>
              {open && (
                <div style={{ position: 'absolute', zIndex: 1000, marginTop: '8px' }}>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                    }}
                    inline
                    ref={datepickerRef}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {showNewModelPopup && (
          <div className={styles.overlay}>
            <div className={styles.popup}>
              <div id="newModalPopupTableContainer">
                <div className={styles.formRow}><span>Name: </span><input type='text' name='name'></input></div>
                <div className={styles.formRow}><span>Breed: </span><input type='text' name='breed'></input></div>
                <div className={styles.formRow}><span>Fur Color: </span><input type='text' name='fur'></input></div>
                <div className={styles.formRow}><span>Eye Color: </span><input type='text' name='eye'></input></div>
                <div className={styles.formRow}><span>Weight: </span><input type='text' name='weight'></input></div>
                <div className={styles.formRow}><span>Length: </span><input type='text' name='length'></input></div>
                <div className={styles.formRow}><span>Image: </span><input type='file' accept="image/*"></input></div>
              </div>
              <div className={styles.buttonContainer}>
                <button onClick={() => setShow(false)}>Close</button>
                <button onClick={() => setShow(false)}>Add Model</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </>

  );
}
