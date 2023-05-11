import { Icon } from "../../components/Icon";
import { Text } from "../../components/Text";
import { Folder } from "../../storageTypes";
import { RecursiveFolder } from "./RecursiveFolder";
import css from "./folderNav.module.css";
import { AllFiles, FileDirectory } from "./types";
import { JustCollectedFolder } from "../App";
import { Button } from "../../components/Button";

const generateTreeStructure = (folders: Folder[]) => {
  const g = new Map<string, Folder[]>();
  const res: AllFiles = [];
  for (const folder of folders) {
    if (folder.parentId) {
      if (!g.has(folder.parentId)) g.set(folder.parentId, []);
      g.get(folder.parentId)?.push(folder);
    } else {
      res.push({ ...folder });
    }
  }
  const dfs = (fileDir: FileDirectory) => {
    if (g.has(fileDir.id)) {
      fileDir.subFolders = g
        .get(fileDir.id)!
        .map((folder) => dfs({ id: folder.id, name: folder.name }));
    }
    return fileDir;
  };
  return res.map((fileDir) => dfs(fileDir));
};

export const FolderNav = ({ folders, addFolder }: { folders: Folder[], addFolder: (fileName:string) => void }) => {
  const fileTree: FileDirectory[] = [
    JustCollectedFolder, //the un-deletable folder >:D
    ...generateTreeStructure(folders),
  ];
  return (
    <div className={css.container}>
      <Text type="heading" bold className={css.title}>
        <Icon name="folder" />
        Folders
        <Button
            onMouseDown={() => addFolder("New Folder")}
            noBorder
            zoomOnHover
            style={{display: "flex", alignItems: "center",
              background: "black", height: "10px"}} //For some reason I can't make it the same using class and css file
          >
              <Icon name="Add"/>
        </Button>

        <Button
            onMouseDown={() => addFolder("New Folder")}
            noBorder
            zoomOnHover
            style={{display: "flex", alignItems: "center",
              background: "black", height: "10px"}}
          >
              <Icon name="Remove"/>
        </Button>

      </Text>
      {fileTree.map((folders) => (
        <RecursiveFolder folders={folders} key={folders.id} />
      ))}
    </div>
  );
};
