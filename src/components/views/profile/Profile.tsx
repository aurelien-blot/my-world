import LoaderComponent from "../../util/LoaderComponent.tsx";
import {useState} from "react";
import {useAuth} from "../../contexts/useAuth.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {contactService} from "../../../services/api/contactService.ts";
import {AxiosError} from "axios";
import {errorService} from "../../../services/util/errorService.ts";
import "../view.css"
import PrimaryBtn from "../../buttons/PrimaryBtn.tsx";
import {Search, UserPlus, Ban} from "lucide-react";
import type {User} from "../../../models/User/user.ts";
import SecondaryBtn from "../../buttons/SecondaryBtn.tsx";

function Profile() {
    const {connectedUser} = useAuth();
    const [isViewLoading, setIsViewLoading] = useState<boolean>(false);
    const [searchedUsername, setSearchedUsername] = useState<string>("");
    const [searchUserError, setSearchUserError] = useState<string | null>();
    const [newContact, setNewContact] = useState<User | null>();
    const queryClient = useQueryClient();

    const {data: contactList, error, isLoading} = useQuery({
        queryKey: ["contactList"],      // identifiant du cache
        queryFn: contactService.getAllForUser,
        refetchOnWindowFocus: false,
        select: (data) => {
            return [...data].sort((a, b) => {
                const nameA = a.contact.username ? a.contact.username.toLowerCase() : '';
                const nameB = b.contact.username ? b.contact.username.toLowerCase() : '';
                return nameA.localeCompare(nameB);
            });
        }
    })

    //TODO afficher la liste des contacts
    //TODO ajouter un contact (recherche par username, si trouvé afficher bouton ajouter)
    if (error) {
        errorService.showErrorInAlert(error as AxiosError);
    }

    const searchContact = useMutation({
        mutationFn: async () => {
            setIsViewLoading(true);
            setSearchUserError(null);
            setNewContact(await contactService.searchNewByUsername(searchedUsername));
        },
        onError: (error: AxiosError) => {
            if (error.response?.status === 404) {
                setSearchUserError("Aucun utilisateur trouvé avec ce nom d'utilisateur.");
            }
            else if (error.response?.status === 400) {
                setSearchUserError("Cet utilisateur fait déjà partie de vos contacts.");
            } else {
                errorService.showErrorInAlert(error);
            }

        },
        onSettled: () => {
            setIsViewLoading(false);
        },
    });

    const inviteContact = useMutation({
        mutationFn: () => {
            setIsViewLoading(true);
            return contactService.inviteContact(newContact!.id)
        },
        onSuccess: () => {
            setNewContact(null);
            setSearchedUsername("");
            queryClient.invalidateQueries({ queryKey: ["contactList"] });
        },
        onError: (error: AxiosError) => {
            errorService.showErrorInAlert(error);
        },
        onSettled: () => {
            setIsViewLoading(false);
        }
    });

    const handleSearchContact = () => {
        searchContact.mutate();
    }

    const handleInviteContact = () => {
        inviteContact.mutate();
    }

    const cancelContactResearch = () => {
        setNewContact(null);
        setSearchedUsername("");
    }
    const getStatusLabel = (status: string) => {
        switch (status) {
            case "PENDING":
                return "En attente";
            case "ACCEPTED":
                return "Accepté";
            case "REJECTED":
                return "Rejeté";
            default:
                return status;
        }
    }

    return (
        <>
            <div className="flex justify-around p-4 max-w-xl mx-auto mb-2">
                <h1 className="text-2xl ">Profil</h1>
            </div>
            <div className="h-[calc(100vh-7rem)] md:h-[calc(100vh-8rem)] overflow-auto">
                {(isViewLoading || isLoading) && <LoaderComponent/>}
                {!isLoading && !isViewLoading &&
                    <div className="block p-4">
                        <div className="viewArea">
                            <h2 className="viewAreaTitle">Informations</h2>
                            <div className="viewContent">
                                <span>{connectedUser!.username}</span>
                            </div>
                        </div>
                        <div className="viewArea">
                            <h2 className="viewAreaTitle">Contacts</h2>

                            <div className="viewContent">
                                <div>Ajouter un contact :</div>
                                <div className="mb-2">
                                    {newContact == null &&
                                        <>
                                            <div className="flex">
                                                <input type="text"
                                                       value={searchedUsername}
                                                       onChange={(e) => setSearchedUsername(e.target.value)}
                                                       className="flex-3 border border-gray-300 rounded p-2 w-full "
                                                       placeholder="Rechercher un contact..."/>

                                                <div className="flex-1 flex justify-center text-center">
                                                    <PrimaryBtn label="Rechercher"
                                                                disabled={searchedUsername.length == 0}
                                                                onClick={handleSearchContact} submit={false}
                                                                icon={<Search className="h-6 w-6"/>}
                                                    />
                                                </div>
                                            </div>
                                            {searchUserError &&
                                                <div className="flex">
                                                    <div className=" flex-3 text-red-500">{searchUserError}</div>
                                                    <div className="flex-1"></div>
                                                </div>
                                            }
                                        </>
                                    }
                                    {newContact != null &&
                                        <>
                                            <div className="flex">
                                                <div className="flex-3">
                                                    <span>{newContact.username}</span>
                                                </div>
                                                <div className="flex-1">
                                                    <PrimaryBtn label="Inviter"
                                                                onClick={handleInviteContact} submit={false}
                                                                icon={<UserPlus className="h-6 w-6"/>}

                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <SecondaryBtn label="Annuler"
                                                                  onClick={cancelContactResearch} submit={false}
                                                                  icon={<Ban className="h-6 w-6"/>}

                                                    />
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>

                            </div>
                            <div className="viewContent">
                                <div>List des contacts :</div>
                                <div>
                                    {contactList && contactList.length > 0 &&
                                        <ul>
                                            {contactList.map((contact) => (
                                                <li key={contact.contact.id}
                                                    className="border-b border-gray-300 py-2">
                                                    {contact.contact.username} : {getStatusLabel(contact.contactStatus)}
                                                </li>
                                            ))}
                                        </ul>
                                    }
                                    {contactList && contactList.length === 0 &&
                                        <div>Aucun contact pour le moment</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Profile;