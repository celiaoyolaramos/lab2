//import "./styles.css";
export const createBoard = (card)=> {
    if(card %2 !==0){
        throw new Error("es necesario un numero par de elementos");
    }
    let listBoard=[];
    let count=0;
    for (let i=0; i<card/2; i++){
        let symbols=String.fromCharCode(75+count);
        let item1={
            backend:":)", 
            frontend:symbols, 
            state:false, 
            done:false, 
            key:`card_${i}`,
           styles :"item",
        };
        
        let item2={...item1};
        listBoard=[...listBoard, item1,item2]
        count++;
    }
    for (let i=0; i<listBoard.length; i++){
        let index=Math.ceil(Math.random()*listBoard.length-1);
        let item =listBoard[index];
        listBoard[index]=listBoard[i];
        listBoard[i]=item;
    }
    listBoard = listBoard.map ((item,index)=> {
       item={id: index, ...item};
       return item; 

    });
    return listBoard;
}