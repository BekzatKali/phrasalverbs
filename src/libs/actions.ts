
// export const getPhrasalVerbs = async () => {
//     try {
//       const res = await fetch("/api/phrasalVerbs", {
//         cache: "no-store"
//       });
//       if (!res.ok) {
//         throw new Error('Failed to fetch PhrasalVerbs');
//       }
//       return res.json();
//     } catch (error) {
//       console.log("Error fetching PhrasalVerbs", error);
//     }
// };

// export const getPhrasalVerbs = async ({userEmail}: {userEmail: string}) => {
//   try {
//     // const {userEmail}
//     const res = await fetch("/api/phrasalVerbs", {
//       cache: "no-store"
//     });
//     if (!res.ok) {
//       throw new Error('Failed to fetch PhrasalVerbs');
//     }
//     return res.json();
//   } catch (error) {
//     console.log("Error fetching PhrasalVerbs", error);
//   }
// };












// export const getPhrasalVerbById = async (id: string) => {
//     try {
//         const res = await fetch(`/api/phrasalVerbs/${id}`, {
//             cache: "no-store",
//         });
//         if (!res.ok) {
//             throw new Error("Failed to fetch phrasal verb");
//         }
//         const data = await res.json();
//         console.log("Phrasal verb data:", data);
//         return data;
//     } catch (error) {
//         console.log(error);
//         return null;
//     }
// };

