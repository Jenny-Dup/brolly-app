import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#435d91',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'left',
    width: '100%',
    marginTop: 40,
    marginBottom: 20,
    padding: 0,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginRight: 10,
    width: '80%',
    backgroundColor: '#fff',
    opacity: 0.7,
  },
  button: {
    height: 40,
    backgroundColor: '#fff',
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'grey',
    fontSize: 14,
  },
  weatherContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  cityName: {
    fontSize: 50,
    color: '#dedee6',
  },
  localTime: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#dedee6',
    marginTop: 5,
  },
  temp: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 50,
  },
  description: {
    fontSize: 30,
    fontStyle: 'italic',
    color: '#fff',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  weatherIcon: {
    width: 150,
    height: 150,
    marginTop: 20,
  },
  rainMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    backgroundColor: '#f5945c',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // Android shadow
    elevation: 5,
  },
});

export default styles;
