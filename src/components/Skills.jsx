import { useEffect, useReducer } from 'react';
import axios from 'axios'
import { skillReducer, initialState, actionTypes } from '../reducers/skillReducer';

export const Skills = () => {
  const [state, dispatch] = useReducer(skillReducer, initialState);

  useEffect(() => {
    dispatch({ type: actionTypes.fetch });
    axios.get('https://api.github.com/users/Atsushi0915/repos')
      .then((response)=>{
        const languageList = response.data.map(res => res.language);
        const countedLanguageList = generateLanguageCountObj(languageList);
        dispatch({tyepe: actionTypes.success, payload: {languageList: count}})
      })
      .catch(() => {
        dispatch({type: actionTypes.error});
      })
    },[]);

  const generateLanguageCountObj = (allLanguageList) => {
    const notNullLanguageList = allLanguageList.filter(language => language != null);
    const uniqueLanguageList = [...new Set(notNullLanguageList)];
  
      
    return uniqueLanguageList.map(item => {
      return {
        language: item,
        count: allLanguageList.filter(language => language === item).length
      }
    })
  }

  return(
    <div id="skills">
      <div className="container">
        <div className="heading">
          <h2>Skills</h2>
        </div>
        <div className="skills-container">

        </div>
      </div>
    </div>
  )
}
