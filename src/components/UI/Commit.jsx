import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";

const Commit = () => {

    const [commits, setCommits] = useState([])

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "commit"), (snapShot) => {
            let commit = [];
            try {
                snapShot.docs.forEach((doc) =>
                    commit.push({ id: doc.id, ...doc.data() })
                );
                setCommits(commit);
            } catch (error) {
                console.log(error);
            }
        });

        return () => unsub();
    }, [])

    return (
        <div className="commit p-4 pt-6">
            <div className="container m-auto">
                <div className="grid grid-cols-4 gap-4">
                    {commits.map(item => (
                        <div className="py-8 px-6 rounded-3xl shadow-lg border border-gray-200" key={item.id}>
                            <img className="w-16 h-16 object-cover m-auto" src={item.imgCommit} alt={item.title} />
                            <h4 className="text-center !text-black capitalize text-lg mb-2 font-bold">{item.title}</h4>
                            <p className="!text-black">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Commit;
