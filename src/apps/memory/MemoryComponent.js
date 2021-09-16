import React, { useEffect, useState } from 'react'
import "./styles.css";
import { createBoard } from './createBoard';
let list=[];
let twice=[];
let score=50;
export const MemoryComponent = () => {
    useEffect(() => {
        list=createBoard(16);
        setStateBoard(list);
        console.log(list);
    }, [])
  
    const [stateBoard, setStateBoard]=useState(list);
    const handlerClick=({id}) =>{
        if(twice.length==2){
            twice=[];
        }
        const item=stateBoard.find((item)=>item.id ===id);
        if(twice.length==0){
            twice=[...twice, item];
        } else if (twice.length==1){
            twice=[...twice, item];
            const [item1]=twice;
            if(score>0){
                if(item1.key!==item.key){
                    console.log("are different");
                    score-=5;
                    setTimeout(()=>{
                        const newStateBoard=stateBoard.map( (item) =>{
                            if(item.done===false){
                                item.state=false;
                                item.styles="item";
                                
                            }
                            return item;
                        });
                        setStateBoard(newStateBoard);
                    }, 1000);
                } else{
                        score+=25;
                        const[item1,item2]=twice;
                        const newStateBoard=stateBoard.map( (item) =>{
                            if(item.id===item1.id || item.id===item2.id){
                                item.done=true;
                                item.styles="itemColor";
                            }
                            return item;
                        });
                        setStateBoard(newStateBoard);
                }
            }
        }
        const newStateBoard= stateBoard.map((item) => {
            if (item.id===id){
                item.state=true;
            }
            return item;
        });
        setStateBoard(newStateBoard);
    
    console.log(score);  
    };
    

    return (
        <div >
            <h1>Memory App</h1>
            <hr/>
            <div className="container ">
                {stateBoard.map((item)=> {
                    return (
                        <div 
                                    className={item.styles} 
                                    key={item.id} 
                                    onClick={()=>{
                                        handlerClick(item);
                                    }} 
                                >
                                {item.state===true?(
                                    <div>{item.frontend} </div>
                                     ):(
                                    <div>{item.backend}</div>
                                    )}
                        </div>
                
                );
                }

                    
                )}
            {score > 0?(
                <h2>score:{score} </h2>):(<div className="perdido">
                                                    <h2>score:{score} </h2>
                                                    <h1>GAME OVER</h1>
                                                    {stateBoard.map((item1)=> {
                                                        item1.backend=":("
                                                        item1.frontend=":("

                                                    })}
                                           </div> )} 
        
            </div>
        </div>
    );
};

