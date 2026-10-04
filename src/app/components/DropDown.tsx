'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { XIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

import Modal from './Modal';
import { File } from '../types';
import { getFileSize, parseDateTime } from '@/lib/utils';
import {
    deleteFile,
    renameFile,
    shareFile,
} from '@/lib/actions/files.action';

type ModalType = 'Rename' | 'Delete' | 'Details' | 'Share' | null;

interface DropDownProps {
    file: File;
}

const DropDown = ({ file }: DropDownProps) => {
    const pathname = usePathname();
    const menuRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeModal, setActiveModal] = useState<ModalType>(null);

    const [rename, setRename] = useState(file.name);
    const [emails, setEmails] = useState<string[]>(file.users ?? []);
    const [emailString, setEmailString] = useState('');

    const createdAt = parseDateTime(file.$createdAt);
    const editedAt = parseDateTime(file.$updatedAt);

    /* ----------------------------- Modal Helpers ---------------------------- */

    const openModal = (modal: Exclude<ModalType, null>) => {
        setIsOpen(false);
        setActiveModal(modal);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setActiveModal(null);
    };

    /* ----------------------------- Menu Actions ----------------------------- */

    const handleDownload = () => {
        setIsOpen(false);

        // TODO: Implement download functionality.
        window.open(file.url, '_blank');
    };

    const handleRename = () => {
        openModal('Rename');
    };

    const handleShare = () => {
        openModal('Share');
    };

    const handleDelete = () => {
        openModal('Delete');
    };

    const handleDetails = () => {
        openModal('Details');
    };

    /* ----------------------------- Share Actions ---------------------------- */

    const removeUser = (email: string) => {
        setEmails((currentEmails) =>
            currentEmails.filter((user) => user !== email)
        );
        shareFile(emails,file.$id,pathname);
    };

    const handleShareFile = async () => {
        const newEmails = emailString
            .split(',')
            .map((email) => email.trim())
            .filter(Boolean);

        const finalEmailList = Array.from(
            new Set([...emails, ...newEmails])
        );

        setEmails(finalEmailList);
        setEmailString('');

        await shareFile(finalEmailList, file.$id, pathname);

        closeModal();
    };

    /* ----------------------------- File Actions ----------------------------- */

    const handleRenameFile = async () => {
        const newName = rename.trim();

        if (!newName) return;

        await renameFile({
            fileId: file.$id,
            name: newName,
            extension: file.extension,
            path: pathname,
        });

        closeModal();
    };

    const handleDeleteFile = async () => {
        await deleteFile(
            file.$id,
            file.bucketFileId,
            pathname
        );

        closeModal();
    };

    /* -------------------------- Close Menu on Outside ----------------------- */

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (!isOpen) return;

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div
            ref={menuRef}
            className="absolute right-2 top-2"
        >
            {/* Menu Button */}
            <button
                type="button"
                aria-label="File actions"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
                className="rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-primary"
            >
                <Image
                    src="/assets/icons/dots.svg"
                    width={18}
                    height={18}
                    alt=""
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 top-7 z-50 flex w-32 flex-col gap-1 rounded-xl border border-border bg-popover p-1 shadow-lg">
                    <button
                        type="button"
                        onClick={handleDownload}
                        className="cursor-pointer rounded p-1.5 text-left text-xs hover:bg-muted"
                    >
                        Download
                    </button>

                    <button
                        type="button"
                        onClick={handleRename}
                        className="cursor-pointer rounded p-1.5 text-left text-xs hover:bg-muted"
                    >
                        Rename
                    </button>

                    <button
                        type="button"
                        onClick={handleShare}
                        className="cursor-pointer rounded p-1.5 text-left text-xs hover:bg-muted"
                    >
                        Share
                    </button>

                    <button
                        type="button"
                        onClick={handleDelete}
                        className="cursor-pointer rounded p-1.5 text-left text-xs text-red-500 hover:bg-muted"
                    >
                        Delete
                    </button>

                    <button
                        type="button"
                        onClick={handleDetails}
                        className="cursor-pointer rounded p-1.5 text-left text-xs hover:bg-muted"
                    >
                        Details
                    </button>
                </div>
            )}

            {/* ---------------------------------------------------------------- */}
            {/* Rename Modal */}
            {/* ---------------------------------------------------------------- */}

            {isModalOpen && activeModal === 'Rename' && (
                <Modal
                    setIsModalOpen={setIsModalOpen}
                    activeModal={activeModal}
                >
                    <div className="mt-4 flex flex-col gap-2">
                        <input
                            type="text"
                            value={rename}
                            onChange={(e) => setRename(e.target.value)}
                            className="w-full rounded-xl border p-2"
                            placeholder="Enter file name"
                        />

                        <button
                            type="button"
                            onClick={handleRenameFile}
                            className="w-full rounded-xl bg-primary p-2 text-primary-foreground"
                        >
                            Done
                        </button>
                    </div>
                </Modal>
            )}

            {/* ---------------------------------------------------------------- */}
            {/* Details Modal */}
            {/* ---------------------------------------------------------------- */}

            {isModalOpen && activeModal === 'Details' && (
                <Modal
                    setIsModalOpen={setIsModalOpen}
                    activeModal={activeModal}
                >
                    <div className="grid grid-cols-2 gap-2 p-4 text-sm">
                        <div className="font-medium">File name</div>
                        <div className="break-all">{file.name}</div>

                        <div className="font-medium">Type</div>
                        <div>{file.type}</div>

                        <div className="font-medium">Owner</div>
                        <div>{file.ownerName || 'Moin'}</div>

                        <div className="font-medium">Size</div>
                        <div>{getFileSize(file.size)}</div>

                        <div className="font-medium">Date created</div>
                        <div>
                            {createdAt?.day}/{createdAt?.month}/{createdAt?.year},{' '}
                            {createdAt?.hour12}:{createdAt?.minute}
                        </div>

                        <div className="font-medium">Date modified</div>
                        <div>
                            {editedAt?.day}/{editedAt?.month}/{editedAt?.year},{' '}
                            {editedAt?.hour12}:{editedAt?.minute}
                        </div>

                        <div className="font-medium">Shared with</div>
                        <div className="break-all">
                            {emails.length > 0
                                ? emails.join(', ')
                                : 'Not shared'}
                        </div>
                    </div>
                </Modal>
            )}

            {/* ---------------------------------------------------------------- */}
            {/* Share Modal */}
            {/* ---------------------------------------------------------------- */}

            {isModalOpen && activeModal === 'Share' && (
                <Modal
                    setIsModalOpen={setIsModalOpen}
                    activeModal={activeModal}
                >
                    <div className="flex flex-col gap-4 p-4">
                        <div>
                            <p className="mb-2 text-center font-medium">
                                Share With
                            </p>

                            <input
                                type="text"
                                value={emailString}
                                onChange={(e) =>
                                    setEmailString(e.target.value)
                                }
                                placeholder="Enter email(s), separated by commas"
                                className="w-full rounded-xl border p-2"
                            />
                        </div>

                        <div className="flex flex-col gap-2 rounded-xl bg-secondary p-2">
                            <p className="text-center text-sm">
                                You have shared this document with
                            </p>

                            {emails.length === 0 ? (
                                <p className="text-center text-sm text-muted-foreground">
                                    No one yet
                                </p>
                            ) : (
                                emails.map((email) => (
                                    <div
                                        key={email}
                                        className="flex items-center justify-between rounded-xl bg-popover p-2"
                                    >
                                        <span className="break-all text-sm text-primary">
                                            {email}
                                        </span>

                                        <button
                                            type="button"
                                            aria-label={`Remove ${email}`}
                                            onClick={() =>
                                                removeUser(email)
                                            }
                                            className="rounded-xl bg-secondary/50 p-1 text-primary hover:bg-secondary"
                                        >
                                            <XIcon size={16} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={handleShareFile}
                            className="w-full rounded-xl bg-primary p-2 text-primary-foreground"
                        >
                            Share
                        </button>
                    </div>
                </Modal>
            )}

            {/* ---------------------------------------------------------------- */}
            {/* Delete Modal */}
            {/* ---------------------------------------------------------------- */}

            {isModalOpen && activeModal === 'Delete' && (
                <Modal
                    setIsModalOpen={setIsModalOpen}
                    activeModal={activeModal}
                >
                    <div className="flex flex-col gap-4 p-4">
                        <p className="text-center text-lg">
                            Are you sure?
                            <br />
                            Once deleted, this document can't be recovered.
                        </p>

                        <button
                            type="button"
                            onClick={handleDeleteFile}
                            className="w-full rounded-xl bg-destructive p-2 text-secondary transition-transform duration-200 hover:scale-[1.02] active:bg-destructive/90"
                        >
                            Delete
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default DropDown;
