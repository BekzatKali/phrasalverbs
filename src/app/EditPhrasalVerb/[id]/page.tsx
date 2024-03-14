import { getPhrasalVerbById } from "@/libs/actions";
import EditPhrasalVerbForm from "../../components/EditPhrasalVerbForm"

interface EditPhrasalVerb {
    params: {
      id: string;
    };
}

export default async function EditPhrasalVerb({params}: EditPhrasalVerb) {
    const { id } = params;
    const { phrasalVerb } = await getPhrasalVerbById(id);
    const { verb, example } = phrasalVerb;
    return <EditPhrasalVerbForm id={id} verb={verb} example={example} />;
}