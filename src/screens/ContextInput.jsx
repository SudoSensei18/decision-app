import { useMemo, useState } from "react";
import { CATEGORIES } from "../data/categories";
import { FACTORS } from "../data/factors";

function ContextInput({ onContinue }) {
  const[step,setStep] = useState(1); // track progress, move screens accordingly

  const [category, setCategory] = useState(null);
  const [customCategory, setCustomCategory] = useState("");

  const [factors, setFactors] = useState([]);
  const [customFactor, setCustomFactor] = useState("");
  const [customFactors, setCustomFactors] = useState([]);

  const [options, setOptions] = useState([]);
  const [optionInput, setOptionInput] = useState("");

  const [textfield, setTextField] = useState("");

  function toggleFactor(id) {
    setFactors((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }

  function addCustomFactor() {
    const value = customFactor.trim();
    if (!value) return;
    if (customFactors.some((f) => f.toLowerCase() === value.toLowerCase())) return;
    setCustomFactors((prev) => [...prev, value]);
    setCustomFactor("");
  }

  function removeCustomFactor(value) {
    setCustomFactors((prev) => prev.filter((f) => f !== value));
  }

  function addOption() {
    const value = optionInput.trim();
    if (!value) return;
    setOptions((prev) => [...prev, value]);
    setOptionInput("");
  }

  function removeOption(indexToRemove) {
  setOptions(prev =>
    prev.filter((_, index) => index !== indexToRemove)
  );
}

  function canProgress(){
    if(step ===1){
      //user must select a category before moving to next step
      return category && (category !== 'other' || customCategory.trim().length > 0);

    }
    if(step === 2){
      return factors.length > 0 || customFactors.length > 0; //user must select factor before moving on
    }
    return true; //steps 3 and 4 are option
  }
  function handleContinue(){
    if (step < 4) {
      setStep(step + 1); //if smaller go to the next step
    }else{
      //if on step 4, submit the form
      onContinue?.(decisionPayload);
    }
  }

  const decisionPayload = useMemo(() => {
    const resolvedCategory = category === "other" ? customCategory.trim() : category;
    return {
      category:resolvedCategory,
      customCategory: category === "other" ? customCategory.trim() : null,
      factors,                 // ids from FACTORS
      customFactors,           // free-text
      options,
      textfield: textfield.trim(),
    };
  }, [category, customCategory, factors, customFactors, options, textfield]);

  const canContinue =
    !!category &&
    (category !== "other" || customCategory.trim().length > 0);

  return (
    <div className="screen">
      {/*Progress Indicator*/ }
     <div className="progress-bar">
      <p>Step {step} of 4</p>
      <div className="state-dots">
        {[1,2,3,4].map(i =>(
          <div key={i} className={i <= step ? "dot active" : "dot"}/>

          
        ))}
      </div>
     </div>
      {/*1: Category selection*/}
      {step === 1 && (
        <section className="card">
          <h2>Select a category</h2>

           <div className="chip-row">
          {CATEGORIES.map((cat) => (
            <button
              className={category === cat.id ? "active" : ""}
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              type="button"
            >
              {cat.label}
            </button>
          ))}
          </div>
          {category === "other" && (
            <input type="text"
            placeholder="Describe your category"
            value={customCategory}
            onChange={(e)=>setCustomCategory(e.target.value)}
             />
          )}
        </section>
      )}  
      {/*2: Factor Select*/}
      {step===2 && (
        <section className="card">
          <h2>What matters to you</h2>
          <div className="chip-row">
            {FACTORS.map((factor)=>(
              <button className={factors.includes(factor.id) ? "active" : ""}
              key={factor.id}
              onClick={()=> toggleFactor(factor.id)}
              type="button"
              >
                {factor.label}

              </button>
            ))}
          </div>

          <div className="row">
            <input type="text" placeholder="Add a custom factor"
            value={customFactor}
            onChange={(e)=>setCustomFactor(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key === "Enter") addCustomFactor();
            }}
             />
             <button onClick={addCustomFactor} type="button">
              Add

             </button>
          </div>
          {customFactors.length> 0 && (
            <div className="chip-row">
            {customFactors.map((f)=>(
              <button  key={f} className="active"
              onClick={()=>removeCustomFactor(f)}
               type="button"
              title="Tap to remove">
              {f} x
              </button>
            ))}
            </div>
          )}

        </section>
      )}
      {/*3: Options Input*/}
      {step === 3 && (
        <section className="card">
          <h2>Do you already have options?</h2>
          <p className="subtitle">Optional</p>

          <div className="row">
            <input type="text" placeholder="Add an option"
            value={optionInput}
            onChange={(e)=>setOptionInput(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key === "Enter") addOption();
            }}
            />
            <button onClick={addOption} type="button">
              Add
            </button>
            

          </div>
            {options.length > 0 && (
      <ul className="list">
        {options.map((opt, index) => (
          <li key={`${opt}-${index}`} className="option-item">
            <span className="option-text">{opt}</span>

            <button
              type="button"
              className="option-remove"
              onClick={() => removeOption(index)}
              aria-label={`Remove ${opt}`}
              title="Remove"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    )}

        </section>
      )}
      {/*4: User provides extra context */}
      {step === 4 && (
        <section className="card">
          <h2>Add any additional information</h2>
          <p className="subtitle">Help us understand your situtation better</p>
          <textarea placeholder="Share any relevant details..." 
          value={textfield}
          onChange={(e)=> setTextField(e.target.value)}
          rows={5}
          ></textarea>
        </section>
      )}
      {/*Nav buttons*/}
      <div className="nav-buttons">
        {step > 1 && (
          <button className="secondary-button" onClick={()=>setStep(step - 1)}
            type="button">
             Back
          </button>
        )}
        <button className="primary-button" disabled={!canProgress()}
        onClick={handleContinue}
        type="button"
        >
          {step === 4 ? 'Get Recommendations' : 'Continue ->'}
        </button>
      </div>

    
    </div>
  );
}

export default ContextInput;
