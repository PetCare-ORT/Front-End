import { StyleSheet, Platform } from "react-native";
import Colors from "./Colors";

export default StyleSheet.create({
  //Pet List ---------------------------------------------------
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

  // General Details ---------------------------------------------------
  detailContainer: {
    flex: 1,
    padding: 5,
    backgroundColor: Colors.PRIMARY_WHITE,
  },
  detailPhoto: {
    flex: 2.5,
    height: 300,
    resizeMode: "cover",
    margin: 5,
    borderWidth: 1,
    borderColor: "#000000",
  },
  detailButtonsText: {
    color: Colors.PRIMARY_WHITE,
    fontWeight: "bold",
  },
  detailButtonsContainer: {
    flex: 0.35,
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  //Pet Details
  petDetailTextContainer: {
    flex: 1,
    margin: 5,
    borderWidth: 1,
    borderColor: Colors.BLACK,
    borderRadius: 0,
    backgroundColor: Colors.PRIMARY_BLUE,
    color: Colors.PRIMARY_WHITE,
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "normal",
  },

  petDetailEditButton: {
    width: "45%",
    backgroundColor: Colors.PRIMARY_PINK,
    borderRadius: 10,
    minHeight: Platform.OS === "web" ? "7vh" : "7%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  petDetailDeleteButton: {
    width: "45%",
    backgroundColor: Colors.RED_WARNING,
    borderRadius: 10,
    minHeight: Platform.OS === "web" ? "7vh" : "7%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },

  //Profile Details
  profileDetailTextContainer: {
    flex: 0.4,
    margin: 5,
    borderWidth: 1,
    borderColor: Colors.BLACK,
    borderRadius: 0,
    backgroundColor: Colors.PRIMARY_BLUE,
    color: Colors.PRIMARY_WHITE,
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "normal",
  },
  profileDetailEditButton: {
    width: "100%",
    backgroundColor: Colors.PRIMARY_PINK,
    borderRadius: 10,
    minHeight: Platform.OS === "web" ? "7vh" : "7%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },

  //Forms ---------------------------------------------------------
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
    borderRadius: 25,
    color: Colors.PRIMARY_WHITE,
  },
  formButton: {
    width: "100%",
    backgroundColor: Colors.PRIMARY_PINK,
    borderRadius: 25,
    minHeight: Platform.OS === "web" ? "4.5vh" : "4.5%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    bottom: 50,
  },
  formPhoto: {
    minHeight: 200,
    resizeMode: "contain",
    marginBottom: 30,
    marginTop: -40,
  },
  userFormButton: {
    width: "100%",
    backgroundColor: Colors.PRIMARY_PINK,
    borderRadius: 25,
    minHeight: Platform.OS === "web" ? "5.5vh" : "5.5%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
    bottom: 50,
  },
  fromButtonText: {
    color: Colors.PRIMARY_WHITE,
    fontWeight: "bold",
  },
});
