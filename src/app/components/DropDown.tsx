import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Modal from './Modal';
import { XIcon } from 'lucide-react';
import { getFileSize, parseDateTime } from '@/lib/utils';
import { deleteFile, renameFile, shareFile } from '@/lib/actions/files.action';
import { File } from '../types';
import path from 'path';
import { usePathname } from 'next/navigation';
type ModalType = 'Rename' | 'Delete' | 'Details' | 'Share' | null;

const DropDown = ({ file }: { file: File }) => {
    console.log(file)

    const path = usePathname()

    const createdAt = parseDateTime(file.$createdAt)
    const editedAt = parseDateTime(file.$updatedAt)


    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [activeModal, setActiveModal] = useState<ModalType>(null);

    const [rename, setRename] = useState(`${file.name}`)
    const [emails, setEmails] = useState<string[]>(file.users)
    const [emailString, setEmailString] = useState('')
    const menuRef = useRef<HTMLDivElement>(null);

    const removeUser = () => {

    }

    const handleDownload = () => {
        setIsModalOpen(true)
        // handle Dwnload
    }
    const handleRename = () => {
        setIsOpen(false);

        setActiveModal('Rename');
        setIsModalOpen(true);
    }
    const handleShare = () => {
        setActiveModal('Share');
        setIsModalOpen(true);
    }
    const handleDelete = () => {
        setActiveModal('Delete');
        setIsModalOpen(true);
    }
    const handleDetails = () => {
        setActiveModal('Details');
        setIsModalOpen(true);
    }
    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="absolute right-2 top-2 " ref={menuRef}>
            {/* Menu Icon / Button */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="focus:outline-none "
            >
                <Image src='./assets/icons/dots.svg' height={0} width={0} alt='' className='w-4.5 h-4.5 ' />

            </button>

            {/* Dropdown Menu Content */}
            {isOpen && (
                <div className="absolute left-0 top-6 w-32 bg-popover border border-border shadow-lg rounded-xl p-1 z-50 flex flex-col gap-1">
                    <button onClick={handleDownload} className="text-left text-xs p-1.5 hover:bg-muted rounded cursor-pointer">
                        Download
                    </button>
                    <button onClick={handleRename} className="text-left text-xs p-1.5 hover:bg-muted rounded cursor-pointer">
                        Rename
                    </button>
                    <button onClick={handleShare} className="text-left text-xs p-1.5 hover:bg-muted rounded cursor-pointer">
                        Share
                    </button>
                    <button onClick={handleDelete} className="text-left text-xs text-red-500 p-1.5 hover:bg-muted rounded cursor-pointer">
                        Delete
                    </button>
                    <button onClick={handleDetails} className="text-left text-xs p-1.5 hover:bg-muted rounded cursor-pointer">
                        Details
                    </button>
                </div>
            )}
            {/*Action Modals*/}
            {isModalOpen && activeModal == 'Rename' && (
                <Modal setIsModalOpen={setIsModalOpen} activeModal={activeModal}>
                    <div className='flex flex-col gap-2 mt-4'>
                        <input className='w-full border p-2 rounded-xl' type="text" value={rename} onChange={(e) => setRename(e.target.value)} />
                        <button onClick={() => {
                            renameFile({ fileId: file.$id, name: rename, extension: file.extension, path: path });
                            setIsModalOpen(false);
                            setActiveModal(null);
                        }} className='w-full bg-primary p-2 text-primary-foreground rounded-xl'>Done</button>
                    </div>
                </Modal>
            )}
            {isModalOpen && activeModal == 'Details' && (
                <Modal setIsModalOpen={setIsModalOpen} activeModal={activeModal}>
                    <div className='grid grid-cols-2 grid-rows-auto gap-2 p-4'>
                        <div>file_name </div>
                        <div>{file.name}</div>
                        <div>type</div>
                        <div>{file.type}</div>
                        <div>owner</div>
                        <div>{file.ownerName ? file.ownerName : 'Moin'}</div>
                        <div>size</div>
                        <div>{getFileSize(file.size)}</div>
                        <div>date created</div>
                        <div>{createdAt?.day}/{createdAt?.month}/{createdAt?.year}, {createdAt?.hour12}:{createdAt?.minute}</div>
                        <div>date modified</div>
                        <div>{editedAt?.day}/{editedAt?.month}/{editedAt?.year}, {editedAt?.hour12}:{editedAt?.minute}</div>
                        <div>shared with</div>
                        <div>[{file.users.map((user) => user)}]</div>
                    </div>
                </Modal>
            )}
            {isModalOpen && activeModal == 'Share' && (
                <Modal setIsModalOpen={setIsModalOpen} activeModal={activeModal}>
                    <div className='flex flex-col gap-4 p-4'>
                        <div className=''>
                            <p className='text-center'>Share With </p>
                            <input className='w-full p-1 border rounded-xl' type="text" placeholder='Enter email' onChange={e => setEmailString(e.target.value)} />
                        </div>
                        <div className='flex flex-col bg-secondary p-2 rounded-xl gap-2'>
                            <p className='text-center'>You have shared this document with</p>
                            {file.users.map((user) => (
                                <div key={user} className='bg-popover p-1 rounded-xl flex justify-between'>

                                    <div className='text-primary '>{user}</div>
                                    <button className='bg-secondary/50 rounded-xl cursor-pointer hover:bg-secondary text-primary' onClick={removeUser}><XIcon /></button>

                                </div>
                            ))}

                        </div>
                        <button className='w-full bg-primary rounded-xl p-2 text-primary-foreground' onClick={() => {
                            const newEmails = emailString.trim().split(',').filter(e => e !== '')
                            console.log(newEmails)
                            const finalEmailList = [...emails, ...newEmails]
                            setEmails(finalEmailList)

                            shareFile(finalEmailList, file.$id, path);
                        }}>
                            Share
                        </button>
                    </div>
                </Modal>
            )}
            {isModalOpen && activeModal == 'Delete' && (
                <Modal setIsModalOpen={setIsModalOpen} activeModal={activeModal}>
                    <div className='p-4 flex flex-col gap-4'>
                        <p className='text-center text-lg'>Are you sure, <br />once deleted dacument can't be recovered </p>
                        <button className='w-full p-2 bg-destructive text-secondary hover:scale-[1.05] transform transition-transform duration-200 active:bg-destructive/90' onClick={() => deleteFile(file.$id, file.bucketFileId, path)}>Delete</button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default DropDown;