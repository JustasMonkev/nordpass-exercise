export type Item = {
    id: string;
    title: string;
    tags: string[];
    files: FileType[];
    fields: Field[];
};

type FileType = {
    id: string;
    name: string;
    size: number;
    content_path: string;
};

type Field = {
    id: string;
    label: string;
    type: string;
    value: string;
};

export const exampleItem: Item = {
    id: "adb9be68-7cf9-4ab3-9c23-b1e349464c98",
    title: "Homework API task v1",
    tags: ["homework"],
    files: [
        {
            id: "dh612ehd28d229d334d4391ddd",
            name: "test.txt",
            size: 124,
            content_path: "vault/dffd/files/dsflfkj123/file"
        }
    ],
    fields: [
        {
            id: "a33c4fef-7e6c-4c04-88ed-4b7cbe0d8515",
            label: "My strong test",
            type: "passwrod",
            value: "WW91V2VyZUg0Y2szZAffff"
        }
    ]
};
