import { useRef, useState } from "react";
import { TagsInput } from "react-tag-input-component";

const InputTag = () => {
    const [products, setProducts] = useState([]);
    const ref = useRef();
    const addTag = e => {
        // console.log(e);
        if (e.key === 'Enter') {
            setProducts(c => ([...c, e.target.value]));
            e.target.value = '';
        }
    }
    const deleteFun = product => {
        setProducts(c => ([...c.filter(pd => pd !== product)]))
    }
    // console.log(products);
    return (
        <div>
            {/* <pre>{JSON.stringify(products)}</pre> */}
            <TagsInput
                className="py-2 px-4 rounded-lg bg-gray-200 focus:outline-none focus:bg-white"
                value={products}
                onChange={setProducts}
                name="fruits"
                placeHolder="enter fruits"
            />
            <em>press enter or comma to add new tag</em>
        </div>
        // <div className="w-full flex justify-start bg-white rounded border border-gray-300  text-base outline-none text-gray-700 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out group">
        //     <div className="flex overflow-x-auto min-w-[200px]">
        //         {products.length > 0 && products.map((pd, i) => <p key={i} className="border border-gray-400 pl-2 pr-3 rounded-md bg-blue-100 relative">{pd}<span onClick={() => deleteFun(pd)} className="font-semibold absolute top-[-6px] right-[2px] text-sm cursor-pointer">x</span></p>)}
        //     </div>
        //     <input ref={ref} onKeyUp={addTag} className="outline-none w-full border-0 resize-none h-9 mx-2" type="text" />
        // </div>
    );
}

export default InputTag;