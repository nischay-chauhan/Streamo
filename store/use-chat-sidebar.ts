import {create} from "zustand"

export enum ChatVariant {
    chat = "CHAT",
    COMMUNITY = "COMMUNITY"
    
}

interface ChatSidebarProps{
    collapsed : boolean;
    onExpand: () => void;
    onCollapse: () => void;
    variant : ChatVariant;
    onChnageVariant : (variant : ChatVariant) => void;
};

export const useCreatorSidebar = create<ChatSidebarProps>((set) => ({
    collapsed : false,
    variant : ChatVariant.chat,
    onExpand : ()=> set(() => ({collapsed : false})),
    onCollapse : () => set(() => ({collapsed : true})),
    onChnageVariant : (variant : ChatVariant) => set(() => ({variant}))
}))