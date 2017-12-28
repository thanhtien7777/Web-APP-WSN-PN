package editor.actions;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

import editor.utils.Clipboard;
import editor.utils.DataImport;
import editor.views.EditorRun;
import editor.views.EditorWindow;
import javafx.event.ActionEvent;

public class ActionQuit implements Action {
	private EditorWindow editor;
	
	public ActionQuit(EditorWindow editor) {
		this.editor = editor;
		
		System.out.println("Server running...");
		try{
			ServerSocket server = new ServerSocket(1234);
			Socket socket=server.accept();
			DataInputStream in = new DataInputStream(socket.getInputStream());
			DataOutputStream out = new DataOutputStream(socket.getOutputStream());
			String nhan=in.readUTF();
			String //str = nhan.replaceAll("\\s+", " ");
				   //str = str.replaceAll("(^\\s+|\\s+$)", "");
				   str = nhan.replace("kwsn", "json");
				System.out.println("Da Nhan file " + str);	
			
			
			
			File f = new File("C:/Users/Jayce/workspace1/WebJava/savefile/"+nhan);
			if(f != null) {
				this.editor.getBoard().clear();
				DataImport.Import(f,this.editor);
			}
			
			
			
			out.writeUTF("Server da nhan duoc file " +str);
			
			
			socket.close();
		}
		catch(IOException e)
		{
			e.printStackTrace();
		}
	}
	
	@Override
	public void actionPerformed(ActionEvent e) {
		//Clipboard.getInstance().removeListener(editor);
		//this.editor.getStage().close();
	}
}
