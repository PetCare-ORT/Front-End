import { StyleSheet, Platform } from "react-native";
import Colors from "./Colors";

export default StyleSheet.create({
  petListContainer: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_WHITE,
    alignItems: "stretch",
    justifyContent: "center",
    elevation: 1,
  },
  petListColumnWrapper: {
    justifyContent: "space-evenly",
    height: 200,
    width: "100%",
  },
  petListAddButton: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    alignSelf: "flex-end",
    elevation: 4,
  },
  petThumbnail: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.PRIMARY_PINK,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 20,
    minWidth: Platform.OS === "web" ? "45vw" : "45%",
    minHeight: "95%",
    elevation: 3,
  },
  petThumnailText: {
    color: Colors.PRIMARY_WHITE,
    fontWeight: "bold",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 5,
    padding: 8,
    backgroundColor: Colors.PRIMARY_WHITE,
  },
  formLabel: {
    color: "black",
    margin: 20,
    marginLeft: 0,
  },
  formInput: {
    backgroundColor: Colors.PRIMARY_BLUE,
    borderColor: "transparent",
    height: 40,
    padding: 10,
    borderRadius: 4,
    color: Colors.PRIMARY_WHITE,
  },
});
