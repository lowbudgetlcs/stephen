<template>
    <div class="login-wrapper">
        <div class="login-card">
            <div class="login-header">
                <h1>☆ LBLCS</h1>
                <p>Sign in to continue</p>
            </div>

            <form @submit.prevent="handleLogin" class="login-form">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input
                        id="username"
                        v-model="username"
                        type="text"
                        placeholder="Enter your username"
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input
                        id="password"
                        v-model="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <p v-if="error" class="error">{{ error }}</p>

                <button type="submit" class="login-btn" :disabled="loading">
                    {{ loading ? "Signing in…" : "Sign In" }}
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { authApi } from "../api";
import { useAuth } from "../composables/useAuth";

const router = useRouter();
const { setUser } = useAuth();

const username = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

async function handleLogin() {
    loading.value = true;
    error.value = "";

    try {
        await authApi.login(username.value, password.value);
        setUser(username.value);
        // Cookie is automatically stored by the browser
        // All future API calls via axiosInstance will include it
        router.push("/events");
    } catch {
        error.value = "Invalid username or password.";
    } finally {
        loading.value = false;
    }
}
</script>

<style scoped>
.login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin-left: -200px; /* offset sidebar margin so it's truly centered */
}

.login-card {
    width: 100%;
    max-width: 380px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 2.5rem 2rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.login-header {
    text-align: center;
    margin-bottom: 2rem;
}

.login-header h1 {
    font-size: 1.5rem;
    color: #1e293b;
    margin-bottom: 0.35rem;
}

.login-header p {
    color: #64748b;
    font-size: 0.9rem;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
}

.form-group label {
    font-size: 0.8rem;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.03em;
}

.form-group input {
    padding: 0.65rem 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 0.95rem;
    color: #1e293b;
    background: #f8fafc;
    transition: border-color 0.15s;
}

.form-group input:focus {
    outline: none;
    border-color: #3b82f6;
    background: #ffffff;
}

.login-btn {
    padding: 0.7rem;
    background: #3b82f6;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s;
    margin-top: 0.5rem;
}

.login-btn:hover {
    background: #2563eb;
}

.login-btn:disabled {
    background: #94a3b8;
    cursor: not-allowed;
}

.error {
    color: #e74c3c;
    font-size: 0.85rem;
    text-align: center;
    margin: 0;
}
</style>
