// @flow
// Optional flow type
import type { RemoteMessage } from '@react-native-firebase';

export default async (message: RemoteMessage) => {
	// handle your message
	console.log("BACKGROUND MESSAGE");
	return Promise.resolve();
}
